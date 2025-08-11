import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { EnquiryProvider } from './contexts/EnquiryContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnquiryProvider>
      <App />
    </EnquiryProvider>
  </StrictMode>
);
