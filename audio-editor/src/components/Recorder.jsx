import React, { useRef, useState } from "react";
import * as Tone from "tone";

export default function Recorder({ setAudioBuffer }) {
  const [isRecording, setIsRecording] = useState(false);
  const [availableMidi, setAvailableMidi] = useState(false);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorderRef.current.ondataavailable = e => chunks.push(e.data);
    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await Tone.getContext().rawContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(audioBuffer);
    };
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  // MIDI Recording (simplified for demo, can be expanded)
  React.useEffect(() => {
    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(() => setAvailableMidi(true));
  }, []);

  return (
    <div className="rounded-xl bg-white/10 p-6 shadow-lg">
      <h2 className="font-semibold text-2xl mb-2">Record Audio</h2>
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded ${isRecording ? "bg-red-700" : "bg-green-700"}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Microphone" : "Start Microphone"}
        </button>
        {availableMidi && (
          <button
            className="px-4 py-2 rounded bg-blue-600"
            title="MIDI record: connect instrument & trigger notes"
            onClick={() => alert("MIDI Recording logic goes here!")}
          >
            Record MIDI
          </button>
        )}
      </div>
    </div>
  );
}
