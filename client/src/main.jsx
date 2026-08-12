import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { UserInfo } from './Info.jsx';
import {MessageProvider} from './mess.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserInfo>
        <MessageProvider>
          <App />
        </MessageProvider>
      </UserInfo>
    </BrowserRouter>
  </StrictMode>,
)
