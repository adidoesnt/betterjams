import { useEffectOnce, useSessionStorage } from "usehooks-ts";
import axios from "axios";
import { useCallback } from "react";

const { VITE_TOKEN_URL } = import.meta.env;

function Success() {
    const [, setToken] = useSessionStorage("token", undefined);

    const fetchToken = useCallback(async () => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get("key");
        const token_endpoint = VITE_TOKEN_URL ?? "";
        const uri = `${token_endpoint}?key=${key}`;
        try {
            const response = await axios.get(uri);
            console.log(response.data);
            const { data } = response;
            const { token } = data;
            return token;
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffectOnce(() => {
        fetchToken().then((token) => setToken(token));
    });

    return <></>;
}

export default Success;
