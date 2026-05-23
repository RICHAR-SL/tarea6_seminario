
import React, { useState } from 'react';

const Translator = ({ onTranslate }) => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('en');

  const handleTranslate = async () => {
    if (!text.trim()) return;
    try {
      // Usando API de MyMemory (gratuita, no requiere key para pruebas)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`
      );
      const data = await response.json();
      const result = data.responseData.translatedText;
      
      setTranslatedText(result);
      onTranslate({ original: text, translated: result });
    } catch (error) {
      console.error("Error al traducir:", error);
      alert("Error al conectar con el servidor de traducción.");
    }
  };

  const speak = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="card">
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Escribe algo en español..." 
      />
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
        <option value="de">Alemán</option>
        <option value="it">Italiano</option>
      </select>
      <button className="btn-main" onClick={handleTranslate}>Traducir</button>
      
      {translatedText && (
        <div className="result-area">
          <p className="result-text">{translatedText}</p>
          <button className="btn-secondary" onClick={speak}>🔊 Escuchar traducción</button>
        </div>
      )}
    </div>
  );
};
export default Translator;
