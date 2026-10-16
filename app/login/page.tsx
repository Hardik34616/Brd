import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
  title: "Sign in — Bhasha BRD",
  description: "Sign in to turn conversations into clear, shareable business requirements.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="auth-loading-fallback">Loading Bhasha BRD...</div>}>
      <LoginPage />
    </Suspense>
  );
}
