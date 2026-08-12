import { createContext, useContext, useState } from "react";
import "./App.css";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <div className={`toastBox toast-${message.type}`}>
          {message.text}
        </div>
      )}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}

