"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const admin_router_1 = require("../modules/admin/admin.router");
const listing_router_1 = require("../modules/listing/listing.router");
const transaction_router_1 = require("../modules/transaction/transaction.router");
const category_router_1 = require("../modules/category/category.router");
const wish_router_1 = require("../modules/wish/wish.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users/",
        routes: user_router_1.userRoutes
    },
    {
        path: "/auth",
        routes: auth_router_1.authRoutes
    },
    {
        path: "/admin",
        routes: admin_router_1.AdminRoutes
    },
    {
        path: "/listings",
        routes: listing_router_1.listingRoutes
    },
    {
        path: "/",
        routes: transaction_router_1.transactionRoutes
    },
    {
        path: "/category",
        routes: category_router_1.categoryRoute
    },
    {
        path: "/wish",
        routes: wish_router_1.wisheRoutes
    }
];
moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});
exports.default = router;
