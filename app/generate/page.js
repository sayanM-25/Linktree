"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emptyLink = { linktext: "", link: "" };

function GenerateForm() {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([emptyLink]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (index, field, value) => {
    setLinks((currentLinks) =>
      currentLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    );
  };

  const addLink = () => {
    setLinks((currentLinks) => [...currentLinks, { ...emptyLink }]);
  };

  const hasCompleteLink = links.some(
    ({ linktext, link }) => linktext.trim() && link.trim(),
  );
  const canSubmit = Boolean(handle.trim() && pic.trim() && hasCompleteLink);

  const submitLinks = async () => {
    if (!canSubmit) return;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          links,
          handle: handle.trim(),
          pic: pic.trim(),
          desc,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Unable to create your Linktree.");
        return;
      }

      toast.success(result.message);
      setLinks([{ ...emptyLink }]);
      setPic("");
      setDesc("");
      setHandle("");
    } catch {
      toast.error("Unable to create your Linktree. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7ec] text-[#254f1c] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)]">
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-14">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#54734d]">
              Get started
            </p>
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Create your Linktree
            </h1>
            <p className="mt-3 max-w-md text-base leading-6 text-[#54734d]">
              Add the links and details that help people find everything you do.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitLinks();
            }}
            className="space-y-5"
          >
            <section className="rounded-3xl border border-[#dce5d3] bg-white p-5 shadow-[0_8px_30px_rgba(37,79,28,0.08)] sm:p-6">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d2e823] text-sm font-black">
                  1
                </span>
                <div>
                  <h2 className="text-lg font-bold">Choose your handle</h2>
                  <p className="text-sm text-[#67805f]">
                    This will be your Linktree address.
                  </p>
                </div>
              </div>
              <label className="flex items-center overflow-hidden rounded-2xl border-2 border-[#dbe4d3] bg-[#f8faf5] transition focus-within:border-[#254f1c] focus-within:bg-white">
                <span className="pl-4 text-lg font-bold text-[#54734d]">@</span>
                <input
                  value={handle}
                  onChange={(event) => setHandle(event.target.value)}
                  type="text"
                  className="w-full bg-transparent px-2 py-4 text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#93a28d]"
                  placeholder="yourname"
                  aria-label="Linktree handle"
                />
              </label>
            </section>

            <section className="rounded-3xl border border-[#dce5d3] bg-white p-5 shadow-[0_8px_30px_rgba(37,79,28,0.08)] sm:p-6">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d2e823] text-sm font-black">
                  2
                </span>
                <div>
                  <h2 className="text-lg font-bold">Add your links</h2>
                  <p className="text-sm text-[#67805f]">
                    Give each destination a clear title.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#e4eadf] bg-[#f8faf5] p-3"
                  >
                    <label className="sr-only" htmlFor={`link-title-${index}`}>
                      Link title
                    </label>
                    <input
                      id={`link-title-${index}`}
                      value={link.linktext}
                      onChange={(event) =>
                        handleChange(index, "linktext", event.target.value)
                      }
                      type="text"
                      className="w-full border-b border-[#dce5d3] bg-transparent px-2 py-2.5 text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#93a28d] focus:border-[#254f1c]"
                      placeholder="Link title"
                    />
                    <label className="sr-only" htmlFor={`link-url-${index}`}>
                      Link URL
                    </label>
                    <input
                      id={`link-url-${index}`}
                      value={link.link}
                      onChange={(event) =>
                        handleChange(index, "link", event.target.value)
                      }
                      type="url"
                      className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-[#93a28d]"
                      placeholder="https://your-link.com"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addLink}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#254f1c] px-5 py-3.5 text-sm font-bold transition hover:bg-[#edf3e6] active:scale-[0.99]"
              >
                <span className="text-xl leading-none">+</span>
                Add link
              </button>
            </section>

            <section className="rounded-3xl border border-[#dce5d3] bg-white p-5 shadow-[0_8px_30px_rgba(37,79,28,0.08)] sm:p-6">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d2e823] text-sm font-black">
                  3
                </span>
                <div>
                  <h2 className="text-lg font-bold">Add your profile</h2>
                  <p className="text-sm text-[#67805f]">
                    Personalize your page with a photo and bio.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="sr-only" htmlFor="profile-picture">
                  Profile picture URL
                </label>
                <input
                  id="profile-picture"
                  value={pic}
                  onChange={(event) => setPic(event.target.value)}
                  type="url"
                  className="w-full rounded-2xl border-2 border-[#dbe4d3] bg-[#f8faf5] px-4 py-3.5 text-base outline-none transition placeholder:text-[#93a28d] focus:border-[#254f1c] focus:bg-white"
                  placeholder="Profile picture URL"
                />
                <label className="sr-only" htmlFor="profile-description">
                  Description
                </label>
                <input
                  id="profile-description"
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                  type="text"
                  className="w-full rounded-2xl border-2 border-[#dbe4d3] bg-[#f8faf5] px-4 py-3.5 text-base outline-none transition placeholder:text-[#93a28d] focus:border-[#254f1c] focus:bg-white"
                  placeholder="A short description about you"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-full bg-[#254f1c] px-6 py-4 text-base font-bold text-white shadow-[0_8px_20px_rgba(37,79,28,0.2)] transition hover:-translate-y-0.5 hover:bg-[#173d10] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#9caf96] disabled:shadow-none"
            >
              Create your Linktree
            </button>
          </form>
        </div>
      </section>

      <aside className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-[#2665d6] p-10 lg:flex">
        <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#d2e823] opacity-90" />
        <div className="absolute bottom-12 right-12 h-16 w-16 rounded-full bg-[#ff7a00]" />
        <Image
          src="/generate.webp"
          width={1024}
          height={1920}
          priority
          className="relative z-10 max-h-[780px] w-full max-w-md object-contain"
          alt="A Linktree creator sharing their content across platforms"
        />
      </aside>
      <ToastContainer position="top-center" />
    </main>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f4f7ec]" />}>
      <GenerateForm />
    </Suspense>
  );
}
