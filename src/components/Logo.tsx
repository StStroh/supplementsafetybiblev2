interface LogoProps {
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
}

export default function Logo({ variant = 'auto', className = '' }: LogoProps) {
  if (variant === 'dark') {
    return (
      <img
        src="/logo-dark.svg"
        alt="Supplement Safety Bible logo"
        className={className}
      />
    );
  }

  if (variant === 'light') {
    return (
      <img
        src="/logo-light.svg"
        alt="Supplement Safety Bible logo"
        className={className}
      />
    );
  }

  return (
    <div className={`logo-auto ${className}`}>
      <img
        src="/logo-dark.svg"
        alt="Supplement Safety Bible logo"
        className="logo-dark"
      />
      <img
        src="/logo-light.svg"
        alt="Supplement Safety Bible logo"
        className="logo-light"
      />
    </div>
  );
}
