import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./Redux/store.js";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "./themes/ThemeProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <SnackbarProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
