import React from "react";
import * as Tone from "tone";

export default function Exporter({ editedBuffer }) {
  const exportWav = () => {
    /*
      For production, use wav-encoder or similar libraries for WAV export.
      This demo simply alerts you—implement full WAV logic as needed!
    */
    alert("Exported! For full code, use wav-encoder npm library to create downloadable WAV files from AudioBuffer.");
  };

  return (
    <div className="rounded-xl bg-white/10 p-6 shadow-lg">
      <h2 className="font-semibold text-2xl mb-2">Export Audio</h2>
      <button className="px-4 py-2 bg-cyan-700 rounded" onClick={exportWav}>
        Export as WAV
      </button>
    </div>
  );
}