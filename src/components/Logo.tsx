
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 56, className = "" }) => (
  <img
    src="/lovable-uploads/b7264137-189f-4012-86fa-ee6c4ecf61b1.png"
    alt="ETF průvodce.cz logo"
    width={size}
    className={`inline-block align-middle ${className}`}
    style={{maxWidth: '100%', height: 'auto'}}
  />
);

export default Logo;
