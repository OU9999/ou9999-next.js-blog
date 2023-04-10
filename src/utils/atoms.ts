import { atom } from "recoil";

export const startAnimationAtom = atom<boolean>({
  key: "modaledit",
  default: false,
});

export const writeAtom = atom<boolean>({
  key: "isWrite",
  default: false,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});

export const tocAtom = atom<string>({
  key: "tocMd",
  default: "",
});

export const colorThemeAtom = atom<string>({
  key: "colorTheme",
  default: "purple",
});

export const isMobileAtom = atom<boolean>({
  key: "isMobile",
  default: false,
});

export const isEntryAtom = atom<boolean>({
  key: "isEntry",
  default: false,
});
