import { Profile } from '@state/userState';
import { useCallback } from 'react';

export type ProfileCardProps = Partial<Profile>;

export const ProfileCard = ({
    display_name,
    images,
    followers,
    country,
    external_urls
}: ProfileCardProps) => {
    const display_image = images?.[0];
    const external_url = external_urls?.spotify;

    const getFollowers = useCallback(
        (followers: Profile['followers'] | undefined) => {
            return `${followers?.total} followers`;
        },
        []
    );

    return (
        <div
            id="profile-container"
            className="w-full h-full flex justify-center items-center"
        >
            <div
                id="profile-card"
                className="bg-beige text-lavender max-w-[75%] flex flex-col overflow-y-auto items-center justify-center p-8 rounded-lg gap-4 border-grey border-[1px]"
            >
                <div>
                    <h1 className="text-2xl font-semibold">{display_name}</h1>
                </div>
                <hr className="border-lavender rounded-md w-[90%]" />
                <img
                    className="rounded-full"
                    src={display_image?.url}
                    height={display_image?.height}
                    width={display_image?.width}
                />
                <div className="text-lg">
                    <p>{country}</p>
                    <p>{getFollowers(followers)}</p>
                    <br />
                    <a target="_blank" href={external_url}>
                        <p className="underline text-black">
                            Open on <span className="text-green">Spotify</span>
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};
