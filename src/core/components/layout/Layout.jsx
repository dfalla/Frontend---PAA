import { Outlet, Navigate } from 'react-router-dom';
import { Navigation, ResponsiveAppBar } from '../';


export const Layout = () => {
    return (
        <>
            {/* <Navigation/> */}
            <ResponsiveAppBar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
