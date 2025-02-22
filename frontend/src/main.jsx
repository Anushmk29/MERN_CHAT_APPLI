import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import ChatProviderContext from "./context/ChatProviderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProviderContext>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProviderContext>
  </BrowserRouter>
);
