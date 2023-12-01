import Layout from '@components/layout';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffectOnce, useSessionStorage } from 'usehooks-ts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Profile, profileState } from '@state/userState';
import { ProfileCard } from '@components/profile';

const { VITE_PROFILE_URL } = import.meta.env;

function Profile() {
    const setProfile = useSetRecoilState(profileState);
    const [profile] = useRecoilState(profileState);
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
            {profile ? (
                <ProfileCard
                    display_name={profile.display_name}
                    country={profile.country}
                    images={profile.images}
                    followers={profile.followers}
                    external_urls={profile.external_urls}
                />
            ) : null}
        </Layout>
    );
}

export default Profile;
