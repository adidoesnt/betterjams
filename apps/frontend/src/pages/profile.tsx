import Layout from '@components/layout';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffectOnce, useSessionStorage } from 'usehooks-ts';
import { useSetRecoilState } from 'recoil';
import { Profile, profileState } from '@state/userState';

const { VITE_PROFILE_URL } = import.meta.env;

function Profile() {
    const setProfile = useSetRecoilState(profileState);
    const [token] = useSessionStorage('token', null);

    const fetchProfile = useCallback(async () => {
        try {
            const profile_endpoint = VITE_PROFILE_URL ?? '';
            const response = await axios.get(profile_endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { data } = response;
            const { profile } = data;
            return profile as Profile;
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffectOnce(() => {
        fetchProfile().then((profile) => {
            setProfile(profile);
        });
    });

    return (
        <Layout>
            <div>Placeholder</div>
        </Layout>
    );
}

export default Profile;
