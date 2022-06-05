import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewDashboard from "../components/ViewDashboard";
import ViewOrders from "../components/ViewOrders";
import ViewTables from "../components/ViewTables";
import ViewCategories from "../components/ViewCategories";
import ViewItems from "../components/ViewItems";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'view-dashboard',
        component: ViewDashboard,
        meta: {
            title: 'Dashboard',
        },
    },
    {
        path: '/orders',
        name: 'view-orders',
        component: ViewOrders,
        meta: {
            title: 'Orders',
        },
    },
    {
        path: '/items',
        name: 'view-items',
        component: ViewItems,
        meta: {
            title: 'Items',
        },
    },
    {
        path: '/tables',
        name: 'view-tables',
        component: ViewTables,
        meta: {
            title: 'Tables',
        },
    },
    {
        path: '/categories',
        name: 'view-categories',
        component: ViewCategories,
        meta: {
            title: 'Categories',
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
