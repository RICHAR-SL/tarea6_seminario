
import React, { useState, useEffect } from 'react';
import Translator from './components/Translator';
import History from './components/History';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('translationHistory') || '[]');
    setHistory(saved);
  }, []);

 // En App.jsx, cambia tu función addToHistory por esta:
const addToHistory = (newEntry) => {
  // Comprobamos si el texto original ya existe en el historial para no repetirlo
  const isDuplicate = history.some(item => item.original === newEntry.original);
  
  if (!isDuplicate) {
    const updated = [newEntry, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('translationHistory', JSON.stringify(updated));
  }
};

  return (
    <div className="app-container">
      <header>
        <h1>IA Translator</h1>
      </header>
      <main>
        <Translator onTranslate={addToHistory} />
        <History items={history} />
      </main>
    </div>
  );
}
export default App;
