import React from 'react';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  style?: React.CSSProperties;
}

const parseTailwindHeight = (className?: string): React.CSSProperties => {
  if (!className) return {};
  const heightMap: Record<string, string> = {
    'h-6': '24px',
    'h-7': '28px',
    'h-8': '32px',
    'h-9': '36px',
    'h-10': '40px',
    'h-11': '44px',
    'h-12': '48px',
    'h-14': '56px',
    'h-16': '64px',
    'h-20': '80px',
  };
  const match = className.match(/\bh-(\d+)\b/);
  if (match && heightMap[match[0]]) {
    return { height: heightMap[match[0]], width: 'auto' };
  }
  return {};
};

export const BractLogo: React.FC<LogoProps> = ({
  className = 'h-12 w-auto',
  style,
  alt = 'BRACT Trust',
  ...props
}) => {
  const twStyle = parseTailwindHeight(className);
  return (
    <img
      src="/bract-logo.png"
      alt={alt}
      className={className}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        ...twStyle,
        ...style
      }}
      {...props}
    />
  );
};

export const VitLogo: React.FC<LogoProps> = ({
  className = 'h-14 w-auto',
  style,
  alt = 'Vishwakarma Institute of Technology, Pune',
  ...props
}) => {
  const twStyle = parseTailwindHeight(className);
  return (
    <img
      src="/vit-logo.png"
      alt={alt}
      className={className}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        ...twStyle,
        ...style
      }}
      {...props}
    />
  );
};

export const IeeeLogo: React.FC<LogoProps> = ({
  className = 'h-12 w-auto',
  style,
  alt = 'IEEE Pune Section',
  ...props
}) => {
  const twStyle = parseTailwindHeight(className);
  return (
    <img
      src="/ieee-logo.png"
      alt={alt}
      className={className}
      style={{
        display: 'inline-block',
        objectFit: 'contain',
        ...twStyle,
        ...style
      }}
      {...props}
    />
  );
};
