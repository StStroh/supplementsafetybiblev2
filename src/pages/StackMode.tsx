import { Helmet } from 'react-helmet-async';
import StackModeChecker from '../components/StackModeChecker';

export default function StackMode() {
  return (
    <>
      <Helmet>
        <title>Stack Mode - Check Multiple Interactions | Safety Bible</title>
        <meta
          name="description"
          content="Check interactions across 2-4 substances simultaneously with pair-wise analysis and severity ranking."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StackModeChecker />
        </div>
      </div>
    </>
  );
}
