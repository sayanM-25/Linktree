import clientPromise from "@/lib/mongodb";
import { HANDLE_COLLATION, validateHandle } from "@/lib/linktree";
import { notFound } from "next/navigation";

/* eslint-disable @next/next/no-img-element -- profile image hosts are user supplied and validated server-side. */

export default async function Page({ params }) {
  const { handle: rawHandle } = await params;
  const handleValidation = validateHandle(rawHandle);

  if (!handleValidation.valid) {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const item = await collection.findOne(
    { handle: handleValidation.value },
    { collation: HANDLE_COLLATION }
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen justify-center items-start py-12 px-4 bg-purple-400">
      {item && (
        <div className="flex flex-col items-center w-full max-w-xl text-center">
          <img
            className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white mb-3"
            src={item.pic}
            alt={`Profile picture for ${item.handle}`}
          />

          <span className="font-bold text-lg text-white tracking-wide mb-8">
            @{item.handle}
          </span>

          <span className="font-bold text-lg text-white tracking-wide mb-8">
            {item.desc}
          </span>

          <div className="w-full flex flex-col gap-4">
            {item.links.map((items, index) => {
              return (
                <div key={index} className="w-full">
                  <a
                    href={items.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-gray-900 font-medium py-4 px-6 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-base"
                  >
                    {items.linktext}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
