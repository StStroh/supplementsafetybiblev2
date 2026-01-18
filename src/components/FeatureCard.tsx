import React from 'react';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  testId?: string;
}

export default function FeatureCard({ icon, title, subtitle, testId }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-slate-200/60 bg-white/70 p-5 shadow-sm" data-testid={testId}>
      <div className="feature-card">
        {icon && (
          <span className="feature-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <div>
          <h3 className="feature-title text-base font-semibold mb-1">{title}</h3>
          {subtitle && <p className="feature-sub text-slate-700 text-sm leading-6">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
