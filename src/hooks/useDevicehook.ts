import { useMediaQuery } from "@chakra-ui/react";

interface IDevicehookReturn {
  isDesktopView: boolean;
  fullOverlay: boolean;
}
export const useDevicehook = (): IDevicehookReturn => {
  const [isDesktopView] = useMediaQuery("(min-width: 767px)", {
    ssr: true,
    fallback: false,
  });
  const [fullOverlay] = useMediaQuery("(min-width: 1280px)", {
    ssr: true,
    fallback: false,
  });

  return { isDesktopView, fullOverlay };
};
