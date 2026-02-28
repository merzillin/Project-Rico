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
]
export default Menus;