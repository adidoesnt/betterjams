import { JamIcon } from '@assets/jam';
import Layout from '@components/layout';
import { LoginButton } from '@components/loginButton';

function Login() {
    return (
        <Layout bg="bg-beige">
            <div className="flex gap-4 flex-col w-full h-full justify-center items-center">
                <h1 className="text-4xl font-bold text-lavender">BetterJams</h1>
                <div className='w-[30%] h-[30%]'>
                    <JamIcon />
                </div>
                <LoginButton />
            </div>
        </Layout>
    );
}

export default Login;
