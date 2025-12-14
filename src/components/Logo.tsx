import { BRAND_NAME } from '../lib/brand';

interface LogoProps {
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
}

export default function Logo({ variant = 'auto', className = '' }: LogoProps) {
  const altText = `${BRAND_NAME} logo`;
  const ariaLabel = BRAND_NAME;

  return (
    <img
      src="/brand/logo.png"
      alt={altText}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
