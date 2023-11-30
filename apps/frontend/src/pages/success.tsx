import { useEffectOnce, useSessionStorage } from 'usehooks-ts';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedState } from '@state/authState';
import Layout from '@components/layout';
import { useNavigate } from 'react-router-dom';

const { VITE_TOKEN_URL } = import.meta.env;

function Success() {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);
    const navigate = useNavigate();
    const [, setToken] = useSessionStorage('token', undefined);
    const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

    const fetchToken = useCallback(async () => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        const token_endpoint = VITE_TOKEN_URL ?? '';
        const uri = `${token_endpoint}?key=${key}`;
        try {
            const response = await axios.get(uri);
            const { data } = response;
            const { token } = data;
            return token;
        } catch (error) {
            console.error('error', error);
        }
    }, []);

    useEffectOnce(() => {
        fetchToken().then((token) => {
            if (!isAuthenticated) {
                setToken(token);
                setIsAuthenticated(true);
            }
        });
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Layout>
            <div>Loading...</div>
        </Layout>
    );
}

export default Success;
