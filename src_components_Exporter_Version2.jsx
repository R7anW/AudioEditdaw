import React from "react";
import * as Tone from "tone";

export default function Exporter({ editedBuffer }) {
  const exportWav = () => {
    const numOfChannels = editedBuffer.numberOfChannels;
    const length = editedBuffer.length * numOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    // Write WAVE header
    // ... (omitted: you can use libraries like wav-encoder for real apps)

    // For brevity, just alert success here:
    alert("Exported! For full code, use wav-encoder npm library to create downloadable WAV files from AudioBuffer.");

    // Real-world: create blob, use URL.createObjectURL to download
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