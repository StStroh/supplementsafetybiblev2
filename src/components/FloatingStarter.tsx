import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Shield } from 'lucide-react';
import { useAuth } from '../state/AuthProvider';

interface FloatingStarterProps {
  variant?: 'A' | 'B';
  scrollThreshold?: number;
}

const STORAGE_KEY = 'floating_starter_dismissed';

export default function FloatingStarter({
  variant = 'A',
  scrollThreshold = 0.18,
}: FloatingStarterProps) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [scrollPastThreshold, setScrollPastThreshold] = useState(false);

  // Check feature flags from env vars and query params
  const getFeatureFlags = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Query param overrides
    const fsQuery = urlParams.get('fs');
    const fsvQuery = urlParams.get('fsv');
    const fsThresholdQuery = urlParams.get('fst');

    // Get env vars
    const envEnabled = import.meta.env.VITE_ENABLE_FLOATING_STARTER === 'true';
    const envVariant = import.meta.env.VITE_FLOATING_STARTER_VARIANT || 'A';
    const envThreshold = parseFloat(import.meta.env.VITE_FLOATING_STARTER_SCROLL_THRESHOLD || '0.18');

    return {
      enabled: fsQuery === '1' ? true : fsQuery === '0' ? false : envEnabled,
      variant: (fsvQuery === 'A' || fsvQuery === 'B' ? fsvQuery : envVariant) as 'A' | 'B',
      threshold: fsThresholdQuery ? parseFloat(fsThresholdQuery) : envThreshold,
    };
  }, []);

  // Check if dismissed in session storage
  useEffect(() => {
    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    setDismissed(isDismissed);
  }, []);

  // Scroll detection with throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = currentScrollY / documentHeight;

        if (scrollPercentage >= scrollThreshold && currentScrollY > lastScrollY) {
          setScrollPastThreshold(true);
        }

        lastScrollY = currentScrollY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollThreshold]);

  // Determine visibility
  useEffect(() => {
    const flags = getFeatureFlags();

    // Don't show if:
    // - Feature disabled
    // - User is authenticated
    // - Component dismissed
    // - Haven't scrolled past threshold
    // - Still loading auth
    if (!flags.enabled || user || dismissed || !scrollPastThreshold || authLoading) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [user, dismissed, scrollPastThreshold, authLoading, getFeatureFlags]);

  // Email validation
  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }

    setEmailError('');
    return true;
  };

  // Handle dismiss
  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setDismissed(true);
    setVisible(false);

    // Emit analytics if available
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('floating_starter_dismiss');
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    // Emit analytics if available
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('floating_starter_submit', { email });
    }

    // Redirect to auth with prefilled email
    navigate(`/auth?mode=signup&tier=starter&email=${encodeURIComponent(email)}`);
  };

  // Track view event when becomes visible
  useEffect(() => {
    if (visible && typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('floating_starter_view', { variant });
    }
  }, [visible, variant]);

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  const flags = getFeatureFlags();
  const currentVariant = flags.variant;

  // Mobile view (sticky bottom bar that can expand)
  return (
    <>
      {/* Desktop: Floating card in bottom-right */}
      <div
        className="floating-starter-desktop"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'none',
        }}
      >
        <div
          className="card"
          style={{
            width: currentVariant === 'B' ? '380px' : '340px',
            maxWidth: 'calc(100vw - 48px)',
            padding: currentVariant === 'B' ? '24px' : '20px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(94, 59, 118, 0.08), 0 8px 32px rgba(94, 59, 118, 0.12)',
            animation: 'floatIn 0.4s ease-out',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div style={{ paddingRight: '24px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '6px',
                lineHeight: 1.2,
              }}
            >
              Start Free — No Credit Card
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
                lineHeight: 1.4,
              }}
            >
              Check supplement interactions instantly.
            </p>

            {/* Variant B: Extra trust element */}
            {currentVariant === 'B' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  padding: '8px 12px',
                  background: '#F5F0FA',
                  borderRadius: '6px',
                }}
              >
                <Shield className="w-4 h-4" style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-brand)', fontWeight: 500 }}>
                  Independent educational resource
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <Mail
                    className="w-4 h-4"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Email address"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      border: `1px solid ${emailError ? 'var(--color-error)' : 'var(--color-border)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => {
                      if (!emailError) {
                        e.currentTarget.style.borderColor = 'var(--color-brand)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!emailError) {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                      }
                    }}
                  />
                </div>
                {emailError && (
                  <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '4px' }}>
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-cta"
                style={{
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '12px',
                }}
              >
                Get Started
              </button>
            </form>

            {/* Variant A: Trust line at bottom */}
            {currentVariant === 'A' && (
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  marginTop: '12px',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                Independent educational resource
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Sticky bottom with expand/collapse */}
      <div
        className="floating-starter-mobile"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'none',
        }}
      >
        {expanded ? (
          // Expanded card
          <div
            style={{
              background: 'var(--color-surface)',
              borderTop: '1px solid var(--color-border)',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '20px',
              boxShadow: '0 -4px 12px rgba(94, 59, 118, 0.08)',
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            {/* Header with close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                  }}
                >
                  Start Free — No Credit Card
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  Check supplement interactions instantly.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '4px',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <Mail
                    className="w-4 h-4"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Email address"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      border: `1px solid ${emailError ? 'var(--color-error)' : 'var(--color-border)'}`,
                      borderRadius: '8px',
                      fontSize: '16px',
                      color: 'var(--color-text)',
                      outline: 'none',
                    }}
                  />
                </div>
                {emailError && (
                  <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '4px' }}>
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-cta"
                style={{
                  width: '100%',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '14px',
                }}
              >
                Get Started
              </button>
            </form>

            <p
              style={{
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                marginTop: '12px',
                textAlign: 'center',
              }}
            >
              Independent educational resource
            </p>
          </div>
        ) : (
          // Collapsed bar
          <button
            onClick={() => setExpanded(true)}
            style={{
              width: '100%',
              background: 'var(--color-cta)',
              border: 'none',
              padding: '16px 20px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 -2px 8px rgba(94, 59, 118, 0.1)',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--color-cta-text)',
                  marginBottom: '2px',
                }}
              >
                Start Free — No Credit Card
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                Check interactions instantly
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-cta-text)',
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </button>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        /* Desktop only */
        @media (min-width: 768px) {
          .floating-starter-desktop {
            display: block !important;
          }
          .floating-starter-mobile {
            display: none !important;
          }
        }

        /* Mobile only */
        @media (max-width: 767px) {
          .floating-starter-desktop {
            display: none !important;
          }
          .floating-starter-mobile {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
