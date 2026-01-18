/**
 * Philosophy & Methodology Section
 *
 * Explains the core principles and approach of Supplement Safety Bible.
 * Positioned before "How it works" to establish trust and methodology.
 */
export default function Philosophy() {
  return (
    <section className="w-full" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Our Philosophy */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Our philosophy
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We treat supplement safety like aviation: checklists beat vibes. Most problems come from
            combinations—supplement + medication, multiple supplements, or the wrong dose for the
            wrong person. Our job is to make those risks visible, explainable, and actionable.
          </p>
        </div>

        {/* What We Believe */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            What we believe
          </h2>

          <div className="space-y-6">
            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Safety first
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Preventing harm matters more than chasing "the best" supplement.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Evidence with humility
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                We summarize what's known, label what's uncertain, and avoid fake certainty.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Transparency builds trust
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                We show sources, confidence, and update dates—so you can judge the strength of the
                information.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Decision support, not medical care
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                We help you ask better questions and avoid obvious risks, but we don't replace your
                clinician.
              </p>
            </div>
          </div>
        </div>

        {/* What Supplement Safety Bible Does */}
        <div className="mb-12">
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            What Supplement Safety Bible does
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Supplement Safety Bible flags common interaction risks and contraindications, then
            translates them into plain steps:
          </p>

          <ul
            className="space-y-2 text-base leading-relaxed ml-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <li className="flex items-start">
              <span
                className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-trial)' }}
              />
              <span>The interaction mechanism (in human language)</span>
            </li>
            <li className="flex items-start">
              <span
                className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-trial)' }}
              />
              <span>Who's most at risk</span>
            </li>
            <li className="flex items-start">
              <span
                className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-trial)' }}
              />
              <span>Severity level</span>
            </li>
            <li className="flex items-start">
              <span
                className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-trial)' }}
              />
              <span>What to do next (avoid, separate timing, monitor, or consult)</span>
            </li>
          </ul>
        </div>

        {/* How We Keep It Reliable */}
        <div>
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            How we keep it reliable
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We use a repeatable method to interpret sources and update entries over time. When
            evidence is mixed or thin, we say so—and we explain why.
          </p>
        </div>

        {/* Safety Grades Explainer */}
        <div
          className="mt-8 p-5 rounded-lg border"
          style={{
            background: 'var(--color-card-bg)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <strong style={{ color: 'var(--color-text)' }}>About our labels:</strong> Safety Grade
            shows how risky the combination can be. Confidence shows how strong the evidence is.
          </p>
        </div>
      </div>
    </section>
  );
}
