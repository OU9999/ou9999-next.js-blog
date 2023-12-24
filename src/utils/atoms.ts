import { atom } from "recoil";

export const writeAtom = atom<boolean>({
  key: "isWrite",
  default: false,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});

export const colorThemeAtom = atom<string>({
  key: "colorTheme",
  default: "purple",
});

export const isEntryAtom = atom<boolean>({
  key: "isEntry",
  default: false,
});
