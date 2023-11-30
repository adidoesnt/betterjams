import Layout from "@components/layout";
import { LoginButton } from "@components/loginButton";

function Login() {
  return (
    <Layout>
      <div className="flex gap-4 flex-col w-full h-full justify-center items-center">
        <h1 className="text-4xl font-bold">BetterJams</h1>
        <LoginButton />
      </div>
    </Layout>
  );
}

export default Login;
