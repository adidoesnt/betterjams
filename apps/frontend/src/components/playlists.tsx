import { Playlists, Playlist, playlistState } from '@state/userState';
import axios from 'axios';
import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffectOnce, useSessionStorage } from 'usehooks-ts';

const { VITE_PLAYLISTS_URL } = import.meta.env;

export type PlaylistProps = Partial<Playlist>;

export type PlaylistsProps = Partial<
    Omit<Playlists, 'items'> & {
        items: PlaylistProps;
    }
>;

export const PlaylistCard = () => {
    return <></>;
};

export const PlaylistsCard = () => {
    const setPlaylists = useSetRecoilState(playlistState);
    const [playlists] = useRecoilState(playlistState);
    const [token] = useSessionStorage('token', null);

    const fetchPlaylists = useCallback(async () => {
        try {
            const playlists_endpoint = VITE_PLAYLISTS_URL ?? '';
            const response = await axios.get(playlists_endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { data } = response;
            const { playlists } = data;
            return playlists as Playlists;
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffectOnce(() => {
        fetchPlaylists().then((playlists) => {
            setPlaylists(playlists);
        });
    });

    console.log(playlists);

    return <></>;
};
