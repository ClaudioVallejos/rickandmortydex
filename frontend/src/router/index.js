import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import GalleryView from "@/views/GalleryView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import notFoundView from "@/views/notFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/",
      name: "gallery",
      component: GalleryView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    { 
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: notFoundView 
    }
  ],
});

export default router;
