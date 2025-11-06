import React, { useState } from "react";
import Recorder from "./components/Recorder";
import Editor from "./components/Editor";
import Exporter from "./components/Exporter";
import "./styles/global.css";

export default function App() {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [editedBuffer, setEditedBuffer] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-600 text-gray-100">
      <header className="py-8 text-center text-4xl font-bold">
        Slick Audio Studio 🎵
      </header>
      <main className="max-w-3xl mx-auto p-4 space-y-8">
        <Recorder setAudioBuffer={setAudioBuffer} />
        {audioBuffer && (
          <Editor
            audioBuffer={audioBuffer}
            setEditedBuffer={setEditedBuffer}
          />
        )}
        {editedBuffer && <Exporter editedBuffer={editedBuffer} />}
      </main>
    </div>
  );
}
