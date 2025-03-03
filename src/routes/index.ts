import { Router } from "express";
import { userRoutes } from "../modules/user/user.router";
import { authRoutes } from "../modules/auth/auth.router";
import { AdminRoutes } from "../modules/admin/admin.router";
import { listingRoutes } from "../modules/listing/listing.router";
import { transactionRoutes } from "../modules/transaction/transaction.router";
import { categoryRoute } from "../modules/category/category.router";

const router = Router();

const moduleRoutes = [
    {
        path: "/users/",
        routes: userRoutes
    },
    {
        path: "/auth",
        routes: authRoutes
    },
    {
        path: "/admin",
        routes: AdminRoutes
    },
    {
        path: "/listings",
        routes: listingRoutes
    },
    {
        path: "/",
        routes: transactionRoutes
    },
    {
        path: "/category",
        routes: categoryRoute
    }
]

moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});

export default router;