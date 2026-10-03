import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100 p-4">
            <div className="mx-auto w-full max-w-6xl">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;