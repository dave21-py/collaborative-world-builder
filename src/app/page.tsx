"use client";
import { useState } from 'react';

export default function Home() {
  // Data for our world
  const worldData = {
    characters: [
      { 
        name: 'Elara, the Sun-Priestess', 
        description: 'Elara is the high priestess of the Sun Temple, known for her calm demeanor and powerful connection to the sun\'s energy, allowing her to perform healing miracles.',
        extra: 'Her staff is said to contain a fragment of a fallen star.'
      },
      { 
        name: 'Grak, the Stone-Hearted',
        description: 'Grak is a legendary warrior from the northern mountains, famed for his unbreakable will and immense strength. He guards the ancient pass against intruders.',
        extra: 'He carries a massive axe forged from the heart of a volcano.'
      }
    ],
    locations: [
      { 
        name: 'The Sunken City of Aeridor',
        description: 'An ancient city lost to the depths of the ocean, rumored to hold powerful artifacts from a bygone era.',
        extra: 'Only accessible during a solar eclipse.'
      },
      { 
        name: 'Crystal Spire Mountains',
        description: 'A treacherous mountain range with peaks made of giant, glowing crystals that pulse with magical energy.',
        extra: 'The mountains are home to majestic crystal golems.'
      }
    ]
  };

  // State to remember which item is selected. Default to the first character.
  const [selectedItem, setSelectedItem] = useState(worldData.characters[0]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-900 p-4 flex flex-col gap-y-4">
        <h2 className="text-xl font-bold text-white">World Index</h2>
        
        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-300">Characters</h3>
          <ul className="pl-4 text-gray-400">
            <li className="cursor-pointer hover:text-white">Elara, the Sun-Priestess</li>
            <li className="cursor-pointer hover:text-white">Grak, the Stone-Hearted</li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-300">Locations</h3>
          <ul className="pl-4 text-gray-400">
            <li className="cursor-pointer hover:text-white">The Sunken City of Aeridor</li>
            <li className="cursor-pointer hover:text-white">Crystal Spire Mountains</li>
          </ul>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
          <p className="text-gray-500">Character/Location Image</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold text-white">Elara, the Sun-Priestess</h1>
          <p className="mt-4 text-lg text-gray-300">
            Elara is the high priestess of the Sun Temple, located in the heart of the Crystal Spire Mountains. She is known for her calm demeanor and her powerful connection to the sun's energy, allowing her to perform healing miracles.
          </p>
          <p className="mt-2 text-md text-gray-400">
            Her staff is said to contain a fragment of a fallen star, which glows with a warm light even in the darkest of nights.
          </p>
        </div>
      </div>
    </div>
  );
}