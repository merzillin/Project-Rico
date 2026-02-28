import type { ReactNode } from "react";

export interface IMenuList {
    label:string;
    route:string;
    icon?: ReactNode;
}

export const MenuList :IMenuList[] = [
    {
        label:'form',
        route:'/form',
    },
    {
        label:'Button styles',
        route:'/button'
    }
]