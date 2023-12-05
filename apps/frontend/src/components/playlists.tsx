import { Playlists, Playlist, playlistState } from '@state/userState';
import axios from 'axios';
import { useCallback, useState, lazy, Suspense } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffectOnce, useSessionStorage } from 'usehooks-ts';

const LazyLoadedModal = lazy(() => import('./modal'));
const { VITE_PLAYLISTS_URL } = import.meta.env;

export type PlaylistProps = {
    playlist: Partial<Playlist>;
};

export type PlaylistsProps = Partial<
    Omit<Playlists, 'items'> & {
        items: PlaylistProps;
    }
>;

export const PlaylistCard = (props: PlaylistProps) => {
    const { playlist } = props;
    const { name, id } = playlist;
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const handleClick = () => setModalIsOpen(true);

    return (
        <>
            <div
                className="w-[75%] bg-lavender rounded-md border-grey border-[1px] p-2"
                onClick={handleClick}
            >
                <h3>{name}</h3>
            </div>
            {id ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyLoadedModal
                        isOpen={modalIsOpen}
                        setIsOpen={setModalIsOpen}
                        playlist_id={id}
                    />
                </Suspense>
            ) : null}
        </>
    );
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

    return (
        <div className="flex flex-col w-[100dvw] justify-center items-center p-4 gap-4">
            <h1 className="text-3xl font-semibold">Playlists</h1>
            <div className="flex flex-col w-[90%] md:w-[75%] lg:w-[50%] max-h-[60dvh] items-center overflow-y-auto bg-beige rounded-lg p-4 gap-2 border-[1px] border-grey">
                {playlists?.items.map((playlist: Playlist) => {
                    const { id } = playlist;
                    return (
                        <>
                            <PlaylistCard key={id} playlist={playlist} />
                        </>
                    );
                })}
            </div>
        </div>
    );
};
