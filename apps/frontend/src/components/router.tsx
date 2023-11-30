import Home from '@pages/home';
import Jam from '@pages/jam';
import Login from '@pages/login';
import Music from '@pages/music';
import Profile from '@pages/profile';
import Success from '@pages/success';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';

export const unauthenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
        </Route>
    )
);

export const authenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/home" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/music" element={<Music />} />
            <Route path="/jam" element={<Jam />} />
        </Route>
    )
);
