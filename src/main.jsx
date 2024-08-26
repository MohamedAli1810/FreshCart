import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserContextProvider from "./Context/UserContext.jsx";
import ProductContextProvider from "./Context/productContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
      <WishlistContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </WishlistContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
