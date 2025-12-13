import { BRAND_NAME } from '../lib/brand';

interface LogoProps {
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
}

export default function Logo({ variant = 'auto', className = '' }: LogoProps) {
  const altText = `${BRAND_NAME} logo`;
  const ariaLabel = BRAND_NAME;

  if (variant === 'dark') {
    return (
      <img
        src="/brand/logo.svg"
        alt={altText}
        aria-label={ariaLabel}
        className={className}
      />
    );
  }

  if (variant === 'light') {
    return (
      <img
        src="/logo-light.svg"
        alt={altText}
        aria-label={ariaLabel}
        className={className}
      />
    );
  }

  return (
    <div className={`logo-auto ${className}`}>
      <img
        src="/brand/logo.svg"
        alt={altText}
        aria-label={ariaLabel}
        className="logo-dark"
      />
      <img
        src="/logo-light.svg"
        alt={altText}
        aria-label={ariaLabel}
        className="logo-light"
      />
    </div>
  );
}
