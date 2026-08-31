"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [handleError, setHandleError] = useState("");
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);

  const createTree = async () => {
    const handle = text.trim();

    if (!handle) {
      setHandleError("Enter a handle to continue.");
      return;
    }

    setHandleError("");
    setIsCheckingHandle(true);

    try {
      const response = await fetch(
        `/api/generate?handle=${encodeURIComponent(handle)}`
      );
      const result = await response.json();

      if (!response.ok) {
        setHandleError(
          result.message || "Unable to check this handle. Please try again."
        );
        return;
      }

      if (!result.available) {
        setHandleError("Handle already taken, try another.");
        return;
      }

      router.push(`/generate?handle=${encodeURIComponent(handle)}`);
    } catch {
      setHandleError("Unable to check this handle. Please try again.");
    } finally {
      setIsCheckingHandle(false);
    }
  };

  return (
    <main>
      <section className="bg-[#d2e823] min-h-screen grid grid-cols-2">
        <div className="flex items-center justify-center flex-col ml-[10vw] gap-6">
          <p className="text-[#254f1a] font-bold text-8xl ">
            A link in bio built for you.
          </p>
          <p className="text-[#254f1c] font-bold text-xl ">
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="self-start">
            <div className="flex gap-5">
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setHandleError("");
                }}
                type="text"
                placeholder="Enter your handle"
                aria-invalid={Boolean(handleError)}
                aria-describedby={handleError ? "handle-error" : undefined}
                className="px-2 py-2 w-xs focus:outline-white bg-white rounded-lg"
              />
              <button
                onClick={() => createTree()}
                disabled={isCheckingHandle}
                className="bg-[#254f1c] text-white px-6 py-6 w-xs rounded-full"
              >
                {isCheckingHandle ? "checking..." : "claim your handle"}
              </button>
            </div>
            {handleError && (
              <p
                id="handle-error"
                className="mt-2 text-sm font-semibold text-red-700"
              >
                {handleError}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center px-6 py-10 lg:mr-[10vw]">
          <img
            src="/generate.webp"
            alt="Linktree creator sharing their content across platforms"
            className="w-full max-w-md object-contain"
          />
        </div>
      </section>
      <section className="bg-[#2665d6] min-h-screen"></section>
    </main>
  );
}
