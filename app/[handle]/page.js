import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { handle } = await params;

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });

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
            alt="profile_pic"
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
                  <Link
                    href={items.link}
                    className="block w-full bg-white text-gray-900 font-medium py-4 px-6 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-base"
                  >
                    {items.linktext}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
