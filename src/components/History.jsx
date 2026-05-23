
import React from 'react';

const History = ({ items }) => (
  <div className="card">
    <h3>Historial Reciente</h3>
    {items.length === 0 ? <p>No hay traducciones aún.</p> : (
      items.map((item, index) => (
        <div key={index} className="history-item">
          <strong>{item.original}</strong> → {item.translated}
        </div>
      ))
    )}
  </div>
);
export default History;
