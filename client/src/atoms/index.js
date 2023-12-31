import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: sessionStorage,
});

export const loginState = atom({
    key: 'loginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const LoggedInNickname = atom({
    key: 'LoggedInNickname',
    default: '',
    effects_UNSTABLE: [persistAtom],
});