import axios from 'axios';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { Song, SongCard } from './song';

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    playlist_id: string;
};

const { VITE_SONGS_URL } = import.meta.env;

const Modal = ({ isOpen, setIsOpen, playlist_id }: ModalProps) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setIsOpen(false);
    };

    const [token] = useSessionStorage('token', null);
    const [tracks, setTracks] = useState<Song[] | undefined>();

    const fetchSongs = useCallback(async () => {
        if (isOpen) {
            try {
                const songs_endpoint = VITE_SONGS_URL ?? '';
                const response = await axios.get(songs_endpoint, {
                    params: {
                        playlist_id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { data } = response;
                const { songs } = data;
                return songs.items as Song[];
            } catch (error: unknown) {
                console.error(error);
            }
        }
    }, [playlist_id, token, isOpen]);

    useEffect(() => {
        fetchSongs().then((songs) => {
            setTracks(songs);
        });
    }, [fetchSongs]);

    return isOpen ? (
        <div className="flex fixed flex-col inset-0 items-center justify-center z-10 backdrop-blur-md text-center w-[100dvw] h-[100dvh]">
            <div className="flex flex-col gap-4 p-4 rounded-md max-h-[90dvh] bg-beige border-grey border-[1px] overflow-y-auto items-center w-[90dvw]">
                <button
                    id="closeModalButton"
                    onClick={handleClick}
                    className="self-end text-sm text-grey"
                >
                    Close
                </button>
                <h3 className="text-grey text-2xl font-semibold">Songs</h3>
                <hr className="border-grey w-[75%]" />
                {tracks ? (
                    tracks.map((track) => {
                        const { track: song } = track;
                        const { id } = song;
                        return (
                            <SongCard
                                key={`${playlist_id}-${id}`}
                                song={track}
                            />
                        );
                    })
                ) : (
                    <p className="text-grey text-md">Loading...</p>
                )}
            </div>
        </div>
    ) : null;
};

export default Modal;
