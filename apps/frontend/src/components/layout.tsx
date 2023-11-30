import { useRecoilValue } from "recoil";
import { Footer } from "./footer";
import { isAuthenticatedState } from "@state/authState";
import { Header } from "./header";

export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: Readonly<LayoutProps>) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  return (
    <div
      id="container"
      className="grid w-[100dvw] h-[100dvh] grid-rows-[1fr_7fr_1fr] items-center justify-center bg-lavender"
    >
      {isAuthenticated ? <Header /> : null}
      <div id="middle" className="row-start-2">
        {children}
      </div>
      {isAuthenticated ? <Footer /> : null}
    </div>
  );
}

export default Layout;
