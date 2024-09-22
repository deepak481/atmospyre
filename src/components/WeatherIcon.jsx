import React, { memo } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const WeatherIcon = memo(({ condition, size = 8 }) => {
  const iconProps = {
    className: `h-${size} w-${size}`,
  };

  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun {...iconProps} className={`${iconProps.className} text-yellow-400`} />;
    case 'clouds':
      return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />;
    case 'rain':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'snow':
      return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-200`} />;
    case 'thunderstorm':
      return <CloudLightning {...iconProps} className={`${iconProps.className} text-yellow-600`} />;
    default:
      return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />;
  }
});

export default WeatherIcon;
