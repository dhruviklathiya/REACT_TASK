import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DDS from './Components/DDS.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
function toggleModal() {
  document.getElementById('modal').classList.toggle('hidden')
}
root.render(
  <>
    <DDS />
  </>
);