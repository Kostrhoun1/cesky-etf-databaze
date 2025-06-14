
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 56, className = "" }) => (
  <img
    src="/lovable-uploads/52c1346d-90ce-4682-b831-38bc81cb8ba7.png"
    alt="ETF průvodce.cz logo"
    width={size}
    className={`inline-block align-middle ${className}`}
    style={{maxWidth: '100%', height: 'auto'}}
  />
);

export default Logo;
