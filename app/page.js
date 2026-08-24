"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const createTree = () => {
    router.push(`/generate?handle=${text}`);
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
          <div className="input flex gap-5 self-start">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Enter your handle"
              id=""
              className="px-2 py-2 w-xs focus:outline-white bg-white rounded-lg"
            />
            <button
              onClick={() => createTree()}
              className="bg-[#254f1c] text-white px-6 py-6 w-xs rounded-full"
            >
              claim your handle
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          this is grid2
        </div>
      </section>
      <section className="bg-[#2665d6] min-h-screen"></section>
    </main>
  );
}
