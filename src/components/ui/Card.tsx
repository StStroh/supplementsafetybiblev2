import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Card({ children, className = '', noPadding = false }: CardProps) {
  return (
    <div className={`card ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
}
