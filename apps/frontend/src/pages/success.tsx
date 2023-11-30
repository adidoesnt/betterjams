import { useEffectOnce, useSessionStorage } from "usehooks-ts";
import axios from "axios";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from "@state/authState";

const { VITE_TOKEN_URL } = import.meta.env;

function Success() {
    const [, setToken] = useSessionStorage("token", undefined);
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

    const fetchToken = useCallback(async () => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get("key");
        const token_endpoint = VITE_TOKEN_URL ?? "";
        const uri = `${token_endpoint}?key=${key}`;
        try {
            const response = await axios.get(uri);
            const { data } = response;
            const { token } = data;
            setIsAuthenticated(true);
            return token;
        } catch (error) {
            console.error(error);
        }
    }, [setIsAuthenticated]);

    useEffectOnce(() => {
        fetchToken().then((token) => {
            setToken(token);
        });
    });

    return <div>Placeholder</div>;
}

export default Success;
