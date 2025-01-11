"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/");
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-dracula-background text-dracula-foreground">
      <h1 className="text-5xl font-bold mb-4 text-dracula-red">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-6 text-dracula-comment text-center">
        The page you are looking for does not exist.
        <br />
        Redirecting to the homepage in <strong>{countdown}</strong> seconds.
      </p>
      <button
        onClick={() => router.replace("/")}
        className="px-6 py-3 bg-dracula-green text-dracula-background rounded hover:bg-dracula-cyan focus:ring-dracula-purple"
      >
        Go to Homepage Now
      </button>
    </div>
  );
}
