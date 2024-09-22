import React, { useState, useEffect, useRef } from 'react';

const usePullToRefresh = (onRefresh) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const startY = useRef(0);
  const thresholdY = 80; // Pixel distance required to trigger refresh

  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;

      if (diff > 0 && window.scrollY === 0) {
        setIsPulling(true);
        setPullProgress(Math.min(diff / thresholdY, 1));
        e.preventDefault();
      } else {
        setIsPulling(false);
        setPullProgress(0);
      }
    };

    const handleTouchEnd = () => {
      if (isPulling && pullProgress === 1) {
        onRefresh();
      }
      setIsPulling(false);
      setPullProgress(0);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullProgress, onRefresh]);

  return { isPulling, pullProgress };
};

const PullToRefresh = ({ onRefresh, children }) => {
  const { isPulling, pullProgress } = usePullToRefresh(onRefresh);

  return (
    <div className='relative'>
      {isPulling && (
        <div
          className='absolute top-0 left-0 w-full h-16 bg-cyan-200 flex items-center justify-center text-cyan-600 transition-transform duration-300 ease-out'
          style={{ transform: `translateY(${pullProgress * 100 - 100}%)` }}
        >
          {pullProgress < 1 ? 'Pull to refresh' : 'Release to refresh'}
        </div>
      )}
      {children}
    </div>
  );
};

export default PullToRefresh;
