import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:7000/api",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <ToastContainer />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
