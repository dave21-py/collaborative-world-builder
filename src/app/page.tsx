"use client";
import { useState } from 'react';
import { generateText } from '@/lib/ai'; // <-- Import our new function

export default function Home() {
  // Data for our world (will be replaced by AI later)
  const worldData = {
    characters: [
      { 
        name: 'Elara, the Sun-Priestess', 
        description: 'Elara is the high priestess of the Sun Temple...',
        extra: 'Her staff is said to contain a fragment of a fallen star.'
      },
      { 
        name: 'Grak, the Stone-Hearted',
        description: 'Grak is a legendary warrior from the northern mountains...',
        extra: 'He carries a massive axe forged from the heart of a volcano.'
      }
    ],
    locations: [
      { 
        name: 'The Sunken City of Aeridor',
        description: 'An ancient city lost to the depths of the ocean...',
        extra: 'Only accessible during a solar eclipse.'
      },
      { 
        name: 'Crystal Spire Mountains',
        description: 'A treacherous mountain range with peaks made of giant, glowing crystals...',
        extra: 'The mountains are home to majestic crystal golems.'
      }
    ]
  };

  // State to remember which item is selected
  const [selectedItem, setSelectedItem] = useState(worldData.characters[0]);

  // --- New function to handle the button click ---
  const handleGenerateCharacter = async () => {
    console.log("Generating character...");
    const prompt = "Describe a new fantasy character for my world in one sentence.";
    
    const aiResponse = await generateText(prompt);
    
    console.log("AI Response:", aiResponse);
    alert("AI Response received! Check the developer console.");
  };
  
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-900 p-4 flex flex-col gap-y-4">
        <h2 className="text-xl font-bold text-white">World Index</h2>
        
        {/* --- New Button --- */}
        <button
          onClick={handleGenerateCharacter}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate New Character
        </button>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-300">Characters</h3>
          <ul className="pl-4 text-gray-400">
            {worldData.characters.map((char) => (
              <li
                key={char.name}
                className={`cursor-pointer hover:text-white ${selectedItem.name === char.name ? 'text-white font-bold' : ''}`}
                onClick={() => setSelectedItem(char)}
              >
                {char.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-300">Locations</h3>
          <ul className="pl-4 text-gray-400">
            {worldData.locations.map((loc) => (
              <li
                key={loc.name}
                className={`cursor-pointer hover:text-white ${selectedItem.name === loc.name ? 'text-white font-bold' : ''}`}
                onClick={() => setSelectedItem(loc)}
              >
                {loc.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
          <p className="text-gray-500">Character/Location Image</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold text-white">{selectedItem.name}</h1>
          <p className="mt-4 text-lg text-gray-300">
            {selectedItem.description}
          </p>
          <p className="mt-2 text-md text-gray-400">
            {selectedItem.extra}
          </p>
        </div>
      </div>
    </div>
  );
}