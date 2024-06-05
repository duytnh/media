import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import HomePage from "./pages/users/homePage";
import Picture from "./pages/users/picture";
import Personal from "./pages/users/personal";
import Friend from "./pages/users/friend";

import Manage from "./pages/admin/manage";
import Login from "./pages/admin/login";
import Register from "./pages/admin/register";
import Analytics from "./pages/admin/annalytics";
import Upload from "./pages/admin/upload";
import ChangePassword from "./pages/users/resetpassword";
import DetailsUser from "./pages/users/detailsUser";
import Notify from "./pages/users/notify";

const RenderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.PICTURES,
            component: <Picture />
        },
        {
            path: ROUTERS.USER.INFO,
            component: <Personal />
        },
        {
            path: ROUTERS.USER.FRIENDS,
            component: <Friend />
        },
        {
            path: ROUTERS.USER.RESET,
            component: <ChangePassword />
        },
        {
            path: ROUTERS.USER.DETAILS_USER + "/:id",
            component: <DetailsUser />
        },
        {
            path: ROUTERS.USER.NOTIFY,
            component: <Notify />
        }
    ];

    const adminRouters = [
        {
            path: ROUTERS.ADMIN.MANAGE,
            component: <Manage />
        },
        {
            path: ROUTERS.ADMIN.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.ADMIN.REGISTER,
            component: <Register />
        },
        {
            path: ROUTERS.ADMIN.ANALYTICS,
            component: <Analytics />
        },
        {
            path: ROUTERS.ADMIN.UPLOAD,
            component: <Upload />
        },
    ];

    const allRouters = [...userRouters, ...adminRouters];

    return (
        <MasterLayout>
            <Routes>
                {
                    allRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return <RenderUserRouter />;
};

export default RouterCustom;
