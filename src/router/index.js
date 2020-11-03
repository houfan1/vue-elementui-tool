import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: '/Home'
    },
    {
        path: "/Home",
        name: "Home",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Home.vue")
    },

    {
        path: "/FormInTable",
        name: "FormInTable",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/FormInTable.vue")
    },
    {
        path: "/Watermark",
        name: "Watermark",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Watermark.vue")
    },
    // {
    //     path: "/DragResize",
    //     name: "DragResize",
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ "../views/DragResize.vue")
    // },
    // {
    //     path: "/Autocomplete",
    //     name: "Autocomplete",
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ "../views/Autocomplete.vue")
    // },
    // {
    //     path: "/Checkrules",
    //     name: "Checkrules",
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ "../views/Checkrules.vue")
    // }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;