import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({
    query: "(min-width: 1824px)",
  });
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    minDeviceWidth: 768,
    maxDeviceWidth: 1368,
  });
  const isMobile = useMediaQuery({
    maxDeviceWidth: 926,
    maxDeviceHeight: 926,
  });
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });
  const isLandscape = useMediaQuery({
    query: "(orientation: landscape)",
  });
  const isRetina = useMediaQuery({
    query: "(min-resolution: 2dppx)",
  });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTablet,
    isMobile,
    isPortrait,
    isLandscape,
    isRetina,
  };
};

export { useResponsive };
