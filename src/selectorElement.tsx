// src/newPopup.tsx
import React from 'react';
import ReactDOM from 'react-dom';

const NewPopup: React.FC = () => {
  return (
    <div>
      <h1>New Popup</h1>
      <p>This is a new popup window.</p>
    </div>
  );
};

ReactDOM.render(<NewPopup />, document.getElementById('new-root'));