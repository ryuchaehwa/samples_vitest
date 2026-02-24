import AxiosContainer from "@/components/axios/AxiosContainer.vue";
import AxiosComparison from "@/components/axios/contents/AxiosComparison.vue";
import AxiosDoc from "@/components/axios/contents/AxiosDoc.vue";
import AxiosTdd from "@/components/axios/contents/AxiosTdd.vue";
import PiniaContainer from "@/components/pinia/PiniaContainer.vue";
import AxiosView from "@/views/AxiosView.vue";
import MainView from "@/views/MainView.vue";
import PiniaView from "@/views/PiniaView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: "axios",
        component: AxiosView,
        children: [
          {
            path: "",
            component: AxiosContainer,
          },
          {
            path: "all",
            component: AxiosDoc,
          },
          {
            path: "comparison",
            component: AxiosComparison,
          },
          {
            path: "tdd",
            component: AxiosTdd,
          },
        ],
      },
      {
        path: "pinia",
        component: PiniaView,
        children: [
          {
            path: "",
            component: PiniaContainer,
          },
        ],
      },
      // {
      //   path: "router",
      //   component: RouterComponent,
      //   children: [
      //     {
      //       path: "",
      //       component: RouterComponent,
      //     },
      //   ],
      // },
      // {
      //   path: "inheritance",
      //   component: InheritanceComponent,
      //   children: [
      //     {
      //       path: "p-a",
      //       component: ParentA,
      //     },

      //     {
      //       path: "p-b",
      //       component: ParentB,
      //     },
      //     {
      //       path: "p-C",
      //       component: ParentC,
      //     },
      //     {
      //       path: "c-a",
      //       component: ChildA,
      //     },
      //     {
      //       path: "c-b",
      //       component: ChildB,
      //     },
      //     {
      //       path: "c-C",
      //       component: ChildC,
      //     },
      //     {
      //       path: "c-D",
      //       component: ChildD,
      //     },
      //   ],
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
