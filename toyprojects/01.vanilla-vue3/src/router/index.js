import { createRouter, createWebHistory } from "vue-router";

import AxiosMocking from "@/components/axios/AxiosMocking.vue";
import ChildA from "@/components/inheritance/ChildA.vue";
import ChildC from "@/components/inheritance/ChildC.vue";
import ChildD from "@/components/inheritance/ChildD.vue";
import ChildB from "@/components/inheritance/ChildB.vue";
import ParentA from "@/components/inheritance/ParentA.vue";
import ParentC from "@/components/inheritance/ParentC.vue";
import ParentB from "@/components/inheritance/ParentB.vue";
import PiniaA from "@/components/pinia/PiniaA.vue";
import PiniaB from "@/components/pinia/PiniaB.vue";
import MainComponent from "@/components/views/MainComponent.vue";
import InheritanceComponent from "@/components/views/InheritanceComponent.vue";
import PiniaComponent from "@/components/views/PiniaComponent.vue";
import AxiosComponent from "@/components/views/AxiosComponent.vue";


const routes = [
    {
        path: '/',
        component: MainComponent,
        children: [
            {
                path: 'axios',
                component: AxiosComponent,
                children: [
                    {
                        path: '#',
                        component: AxiosMocking
                    }
                ]
            },
            {
                path: 'inheritance',
                component: InheritanceComponent,
                children: [
                        {
                            path: 'inheritance/p-a',
                            component: ParentA,
                        },
                        
                        {
                            path: 'inheritance/p-b',
                            component: ParentB,
                        },
                        {
                            path: 'inheritance/p-C',
                            component: ParentC,
                        },
                        {
                            path: 'inheritance/c-a',
                            component: ChildA,
                        },
                        {
                            path: 'inheritance/c-b',
                            component: ChildB,
                        },
                        {
                            path: 'inheritance/c-C',
                            component: ChildC,
                        },
                        {
                            path: 'inheritance/c-D',
                            component: ChildD,
                        },
                ]
            },
            {
                path: 'pinia',
                component: PiniaComponent,
                children: [

            {
                path: 'pinia/a',
                component: PiniaA
            },
            {
                path: 'pinia/b',
                component: PiniaB
            }
                ]
            },

        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
