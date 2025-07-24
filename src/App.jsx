import React, { useState } from 'react';

const API_BASE = "http://localhost:5000"; // Update with production backend if needed

export default function App() {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [target, setTarget] = useState("");
  const [modality, setModality] = useState("");
  const [aiResults, setAiResults] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setRows(data);
  };

  const handleAISearch = async () => {
    const res = await fetch(`${API_BASE}/ai-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, modality })
    });
    const data = await res.json();
    setAiResults(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Biotech DMS Dashboard</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Upload CSV:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpload}>
          Submit
        </button>
      </div>

      {rows.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Scored Programs</h2>
          <table className="w-full border text-sm">
            <thead><tr>{Object.keys(rows[0]).map(k => <th key={k} className="border px-2 py-1">{k}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>{Object.values(r).map((v, j) => <td key={j} className="border px-2 py-1">{String(v)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mb-6">
        <label className="block font-medium mb-1">Target:</label>
        <input className="border px-2 py-1 w-full" value={target} onChange={(e) => setTarget(e.target.value)} />
        <label className="block font-medium mb-1 mt-2">Modality:</label>
        <input className="border px-2 py-1 w-full" value={modality} onChange={(e) => setModality(e.target.value)} />
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded" onClick={handleAISearch}>
          AI Search
        </button>
      </div>

      {aiResults.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">AI-Generated Programs</h2>
          <table className="w-full border text-sm">
            <thead><tr>{Object.keys(aiResults[0]).map(k => <th key={k} className="border px-2 py-1">{k}</th>)}</tr></thead>
            <tbody>
              {aiResults.map((r, i) => (
                <tr key={i}>{Object.values(r).map((v, j) => <td key={j} className="border px-2 py-1">{String(v)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
