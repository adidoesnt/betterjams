import { JamIcon } from '@assets/jam';
import { MusicIcon } from '@assets/music';
import { ProfileIcon } from '@assets/profile';
import { Link } from 'react-router-dom';

const ProfileButton = () => {
    return (
        <div className="w-[60px] h-[60px]">
            <Link to="/profile">
                <ProfileIcon />
            </Link>
        </div>
    );
};

const MusicButton = () => {
    return (
        <div className="w-[60px] h-[60px]">
            <Link to="/music">
                <MusicIcon />
            </Link>
        </div>
    );
};

const JamButton = () => {
    return (
        <div className="w-[60px] h-[60px]">
            <Link to="/jam">
                <JamIcon />
            </Link>
        </div>
    );
};

export const Footer = () => {
    return (
        <div className="flex w-full h-full justify-center items-center p-4">
            <div className="flex gap-8 h-full justify-between items-center bg-grey rounded-3xl border-[1px] border-beige px-4 py-2">
                <ProfileButton />
                <MusicButton />
                <JamButton />
            </div>
        </div>
    );
};
