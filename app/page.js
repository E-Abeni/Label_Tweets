"use client"

import {handleProduce, handleConsume} from './actions'
import React, { useState } from 'react';


function SentimentAnalyzer() {
  const [text, setText] = useState('ዜና የሶማሊያና #ኤርትራ መሪዎች በሶማሊያ ሉዓላዊነት እና የግዛት አንድነት ዙርያ ውይይት ማድረጋቸው ተገለጸ');
  
  const [sentiment, setSentiment] = useState(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handlePositiveClick = () => {
    setSentiment('positive');
  };

  const handleNegativeClick = () => {
    setSentiment('negative');
  };

  const handleNeutralClick = () => {
    setSentiment('neutral');
  };

  async function sub(formData){
    let text = ""
    let label = ""
    if(formData){
      for (const [key, value] of formData.entries()) {
        if (key === "text"){
          text = value
        }
        else{
          label = key
        }
      }
      await handleProduce({text, label})
    }
    

    let new_text = await handleConsume()
    setText(new_text)
  
  }
  return (
    <form action={sub}>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-black">Sentiment Label</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          rows={5}
          value={text}
          onChange={handleInputChange}
          placeholder="Enter your text here"
          name = "text"
        />
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handlePositiveClick}
            name="positive"
          >
            Positive
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleNeutralClick}
            name = "neutral"
          >
            Neutral
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleNegativeClick}
            name = "negative"
          >
            Negative
          </button>
        </div>
        {sentiment && (
          <div className="mt-2 text-center">
            <p className="text-lg font-bold text-black">Sentiment:</p>
            <p className={`text-xl ${sentiment === 'positive' ? 'text-green-500' : sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'}`}>
              {sentiment}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}



export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SentimentAnalyzer />     
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          INSA Data Labeling Platform
      </footer>
    </div>
  );
}
