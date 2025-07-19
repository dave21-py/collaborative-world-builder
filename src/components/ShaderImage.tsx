"use client";
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import { useRef } from 'react';

// This is the GLSL shader code
const ImageFadeMaterial = shaderMaterial(
  { u_time: 0, u_texture: new THREE.Texture() },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float u_time;
  uniform sampler2D u_texture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float ripple = sin(uv.x * 10.0 + u_time * 0.5) * 0.02;
    uv.y += ripple;
    vec4 textureColor = texture2D(u_texture, uv);
    gl_FragColor = textureColor;
  }
  `
);

extend({ ImageFadeMaterial });

const FadingImage = ({ src }: { src: string }) => {
  const materialRef = useRef<any>();
  const texture = useTexture(src);
  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.u_time += delta;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[16, 9]} />
      {/* @ts-ignore */}
      <imageFadeMaterial ref={materialRef} u_texture={texture} />
    </mesh>
  );
};

const ShaderImage = ({ src }: { src: string }) => {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 15] }}>
      <FadingImage src={src} />
    </Canvas>
  );
};

export default ShaderImage;