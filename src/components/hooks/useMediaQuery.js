import { useState, useEffect } from 'react';

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.screen.width;

      setIsMobile(screenWidth <= 360);
      setIsTablet(screenWidth <= 720);
      setIsDesktop(screenWidth > 720);
    };

    handleResize();
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useMediaQuery;
