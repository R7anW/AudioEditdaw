import React, { useRef, useEffect, useState } from "react";
import * as Tone from "tone";

export default function Editor({ audioBuffer, setEditedBuffer }) {
  const audioCtx = Tone.getContext().rawContext;
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(audioBuffer.duration);

  // Effect parameters
  const [filterType, setFilterType] = useState("lowpass");
  const [filterFreq, setFilterFreq] = useState(800);
  const [reverbDecay, setReverbDecay] = useState(1.5);

  const playerRef = useRef(null);
  const filterRef = useRef(null);
  const reverbRef = useRef(null);

  useEffect(() => {
    filterRef.current = new Tone.Filter(filterFreq, filterType).toDestination();
    reverbRef.current = new Tone.Reverb(reverbDecay).toDestination();
    playerRef.current = new Tone.Player(audioBuffer)
      .connect(filterRef.current)
      .connect(reverbRef.current);
    return () => {
      playerRef.current.dispose();
      filterRef.current.dispose();
      reverbRef.current.dispose();
    };
  }, [audioBuffer, filterFreq, filterType, reverbDecay]);

  const play = () => {
    playerRef.current.stop();
    playerRef.current.start(trimStart, trimStart, trimEnd - trimStart);
  };

  const trim = () => {
    const { numberOfChannels } = audioBuffer;
    const sampleRate = audioBuffer.sampleRate;
    const startSample = Math.floor(trimStart * sampleRate);
    const endSample = Math.floor(trimEnd * sampleRate);
    const length = endSample - startSample;
    const newBuffer = audioCtx.createBuffer(numberOfChannels, length, sampleRate);
    for (let ch = 0; ch < numberOfChannels; ch++)
      newBuffer.copyToChannel(audioBuffer.getChannelData(ch).slice(startSample, endSample), ch, 0);
    setEditedBuffer(newBuffer);
  };

  return (
    <div className="rounded-xl bg-white/10 p-6 shadow-lg">
      <h2 className="font-semibold text-2xl mb-2">Edit Audio</h2>
      <div className="flex gap-4 items-center mb-4">
        <button className="px-3 py-2 bg-indigo-600 rounded" onClick={play}>Preview</button>
        <label>
          Start (sec):
          <input className="ml-1 px-2 py-1 bg-gray-800 rounded" type="number" min={0} max={audioBuffer.duration} step={0.01} value={trimStart} onChange={e => setTrimStart(Number(e.target.value))} />
        </label>
        <label>
          End (sec):
          <input className="ml-1 px-2 py-1 bg-gray-800 rounded" type="number" min={0} max={audioBuffer.duration} step={0.01} value={trimEnd} onChange={e => setTrimEnd(Number(e.target.value))} />
        </label>
        <button className="px-3 py-2 bg-green-700 rounded" onClick={trim}>Trim</button>
      </div>
      <div className="mt-4 flex gap-4">
        <div>
          <label>Filter Type:</label>
          <select value={filterType} onChange={e=>setFilterType(e.target.value)} className="ml-2 px-2 py-1 bg-gray-800 rounded">
            <option value="lowpass">Lowpass</option>
            <option value="highpass">Highpass</option>
            <option value="bandpass">Bandpass</option>
          </select>
        </div>
        <div>
          <label>Cutoff Freq:</label>
          <input type="range" min={100} max={5000} value={filterFreq} 
            onChange={e=>setFilterFreq(Number(e.target.value))} />
          <span className="ml-2">{filterFreq} Hz</span>
        </div>
        <div>
          <label>Reverb Decay:</label>
          <input type="range" min={0.1} max={5} step={0.1} value={reverbDecay}
            onChange={e=>setReverbDecay(Number(e.target.value))} />
          <span className="ml-2">{reverbDecay}s</span>
        </div>
      </div>
    </div>
  );
}