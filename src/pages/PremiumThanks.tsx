import { useEffect, useState } from "react";

type SessionShape = {
  id: string;
  status: string | null;
  payment_status: string | null;
  customer_email: string | null;
  subscription_status: string | null;
  customer_id?: string | null;
};

export default function PremiumThanks() {
  const [state, setState] = useState<"loading" | "ok" | "fail">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get("session_id");
    if (!sid) { setState("fail"); return; }

    (async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/retrieve-session?session_id=${encodeURIComponent(sid)}`
        );
        if (!res.ok) throw new Error("retrieve failed");
        const data = (await res.json()) as SessionShape;

        const paid =
          data.payment_status === "paid" ||
          data.subscription_status === "active" ||
          data.subscription_status === "trialing";

        if (paid) {
          localStorage.setItem("isPremium", "1");
          setEmail(data.customer_email);
          setState("ok");
        } else {
          setState("fail");
        }
      } catch {
        setState("fail");
      }
    })();
  }, []);

  if (state === "loading") {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Verifying your purchase…</h1>
        <p className="mt-2 text-gray-600">This only takes a moment.</p>
      </main>
    );
  }

  if (state === "fail") {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">We couldn't verify your session.</h1>
        <p className="mt-2 text-gray-600">
          If you were charged, access will unlock shortly. You can also retry.
        </p>
        <a className="mt-4 inline-block underline" href="/pricing">Back to Pricing</a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Welcome to Premium 🎉</h1>
      {email && <p className="mt-2 text-gray-700">Activated for: <strong>{email}</strong></p>}
      <p className="mt-4">Your access is active now. Don't Mix Blind™.</p>
      <a className="mt-4 inline-block rounded-lg px-5 py-3 bg-black text-white" href="/premium">
        Go to Premium
      </a>
    </main>
  );
}
