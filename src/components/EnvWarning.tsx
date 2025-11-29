import { getEnv } from "../lib/env";

export default function EnvWarning() {
  const { ok } = getEnv();
  if (ok) return null;
  return (
    <div className="w-full bg-yellow-100 text-yellow-900 text-sm px-4 py-2">
      Supabase configuration missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example) and redeploy.
    </div>
  );
}
