import { useCallback } from 'react';

export type Song = {
    added_at: string;
    added_by: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: string;
            total: number;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    track: {
        album: {
            album_type: string;
            total_tracks: number;
            available_markets: Array<string>;
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            images: Array<{
                url: string;
                height: number;
                width: number;
            }>;
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions: {
                reason: string;
            };
            type: string;
            uri: string;
            artists: Array<{
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }>;
        };
        artists: Array<{
            external_urls: {
                spotify: string;
            };
            followers: {
                href: string;
                total: number;
            };
            genres: Array<string>;
            href: string;
            id: string;
            images: Array<{
                url: string;
                height: number;
                width: number;
            }>;
            name: string;
            popularity: number;
            type: string;
            uri: string;
        }>;
        available_markets: Array<string>;
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
            isrc: string;
            ean: string;
            upc: string;
        };
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from: Record<string, unknown>;
        restrictions: {
            reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
    };
};

export type SongProps = {
    song: Partial<Song>;
};

export const SongCard = (props: SongProps) => {
    const { song } = props;
    const { track } = song;

    const handleClick = () => console.log('playback');

    const getDuration = useCallback((duration_ms: number | undefined) => {
        if (duration_ms) {
            const minutes = Math.floor(duration_ms / 60000);
            const seconds = +((duration_ms % 60000) / 1000).toFixed(0);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            return '0:00';
        }
    }, []);

    return (
        <div
            className="w-[75%] bg-lavender rounded-md border-grey border-[1px] p-2 flex flex-col items-center"
            onClick={handleClick}
        >
            <h3 className="text-lg text-beige">{track?.name}</h3>
            <h4 className="font-light">
                {track?.artists?.map((artist) => artist.name).join(', ')}
            </h4>
            <h4 className="font-light">
                {track?.album?.release_date?.split('-')[0]}
            </h4>
            <h4 className="font-light">{getDuration(track?.duration_ms)}</h4>
        </div>
    );
};
