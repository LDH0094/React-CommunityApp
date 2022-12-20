import { atom } from 'recoil';

export interface AuthState {
    token: string,
}

const defaultAuthState: AuthState = {
    token: '',
}

export const authState = atom<AuthState>({
    key: "authState",
    default: defaultAuthState
})