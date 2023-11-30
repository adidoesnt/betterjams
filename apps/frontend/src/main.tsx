import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { authenticatedRouter, unauthenticatedRouter } from "@components/router";

const isAuthenticated = false;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {isAuthenticated ? (
            <RouterProvider router={authenticatedRouter} />
        ) : (
            <RouterProvider router={unauthenticatedRouter} />
        )}
    </React.StrictMode>
);
