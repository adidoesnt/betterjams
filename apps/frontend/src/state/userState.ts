import { atom } from 'recoil';

export type Profile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    product: string;
    type: string;
    uri: string;
};

export const profileState = atom<Profile | undefined>({
    key: 'profileState',
    default: undefined
});

export type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
        url: number;
        height: number;
        width: number;
    }>;
    name: string;
    owner: {
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
        display_name: string;
    };
    public: false;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
};

export type Playlists = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<Playlist>;
};

export const playlistState = atom<Playlists | undefined>({
    key: 'playlistState',
    default: undefined
});
