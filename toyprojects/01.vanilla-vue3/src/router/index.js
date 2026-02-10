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
import MainComponent from "@/views/MainComponent.vue";
import InheritanceComponent from "@/views/InheritanceComponent.vue";
import PiniaComponent from "@/views/PiniaComponent.vue";
import AxiosComponent from "@/views/AxiosComponent.vue";


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
                        path: '',
                        component: AxiosMocking
                    }
                ]
            },
            {
                path: 'inheritance',
                component: InheritanceComponent,
                children: [
                        {
                            path: 'p-a',
                            component: ParentA,
                        },
                        
                        {
                            path: 'p-b',
                            component: ParentB,
                        },
                        {
                            path: 'p-C',
                            component: ParentC,
                        },
                        {
                            path: 'c-a',
                            component: ChildA,
                        },
                        {
                            path: 'c-b',
                            component: ChildB,
                        },
                        {
                            path: 'c-C',
                            component: ChildC,
                        },
                        {
                            path: 'c-D',
                            component: ChildD,
                        },
                ]
            },
            {
                path: 'pinia',
                component: PiniaComponent,
                children: [

            {
                path: 'a',
                component: PiniaA
            },
            {
                path: 'b',
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
