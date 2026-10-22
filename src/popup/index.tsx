import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupApp } from './PopupApp';
import '../index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div className="w-[390px] min-h-[560px]">
        <PopupApp initialState="empty" initialReport={undefined} />
      </div>
    </React.StrictMode>
  );
}
