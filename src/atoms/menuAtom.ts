import { atom } from 'recoil';

export interface MenuState{
    itemSelected: string;
}

const defaultMenuState: MenuState = {
    itemSelected: '1'
}

export const menuState = atom<MenuState>({
    key: "menuState",
    default: defaultMenuState
})