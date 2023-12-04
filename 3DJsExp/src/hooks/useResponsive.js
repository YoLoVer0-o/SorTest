import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({
    query: "(min-width: 1824px)",
  });
  const isTabletOrMobile = useMediaQuery({
    maxWidth: 1224,
  });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1368,
  });
  const isMobile = useMediaQuery({
    maxWidth: 936,
    maxHeight: 936,
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
