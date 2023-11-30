import Layout from "@components/layout";
import { LoginButton } from "@components/loginButton";

function Login() {
    return (
        <Layout>
            <div className="flex w-full h-full justify-center items-center">
                <LoginButton />
            </div>
        </Layout>
    );
}

export default Login;
