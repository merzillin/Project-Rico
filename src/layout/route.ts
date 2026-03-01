import { lazy, type ReactNode } from "react";
import type { ComponentType, LazyExoticComponent } from "react";


export interface IMenu {
    label:string;
    route:string;
    icon: ReactNode;
    component: LazyExoticComponent<ComponentType<any>>;
}

const Menus :IMenu[] = [
    {
        label:'Form',
        route:'/form',
        icon:'',
        component: lazy(()=> import('../module/form/index'))
    },
    {
        label:'Custom Style',
        route:'/custom',
        icon:'',
        component: lazy(()=> import('../module/form/index'))
    },
    {
        label:'Calculator',
        route:'/calculator',
        icon:'',
        component: lazy(()=> import('../module/Calculator/index'))
    },
]
export default Menus;