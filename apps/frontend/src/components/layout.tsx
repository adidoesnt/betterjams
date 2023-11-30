export type LayoutProps = {
    children: JSX.Element | JSX.Element[];
};

function Layout({ children }: Readonly<LayoutProps>) {
    return (
        <div
            id="container"
            className="grid w-[100dvw] h-[100dvh] grid-rows-[1fr_7fr_1fr] items-center justify-center"
        >
            <div id="header">Placeholder Header</div>
            <div id="middle">{children}</div>
            <div id="footer">Placeholder Footer</div>
        </div>
    );
}

export default Layout;
