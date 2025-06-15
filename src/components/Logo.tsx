
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 56, className = "" }) => (
  <img
    src="/lovable-uploads/5a424d56-d73a-4e9a-905d-440a1b58f13f.png"
    alt="ETF průvodce.cz logo"
    width={size}
    className={`inline-block align-middle ${className}`}
    style={{maxWidth: '100%', height: 'auto'}}
  />
);

export default Logo;
