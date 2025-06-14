
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 56, className = "" }) => (
  <img
    src="/lovable-uploads/309dc032-f139-42b5-87d6-8c8b48a483de.png"
    alt="ETF průvodce.cz logo"
    width={size}
    height={size}
    className={`inline-block align-middle ${className}`}
    style={{maxWidth: '100%', height: 'auto'}}
  />
);

export default Logo;
