import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { authenticatedRouter, unauthenticatedRouter } from "@components/router";
import { isAuthenticatedState } from "@state/authState";
import { RecoilRoot, useRecoilValue } from "recoil";

export const App = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);

    return (
        <React.StrictMode>
            <RouterProvider
                router={
                    isAuthenticated
                        ? authenticatedRouter
                        : unauthenticatedRouter
                }
            />
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
);
