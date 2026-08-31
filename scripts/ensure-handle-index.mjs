import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

const client = new MongoClient(uri);

try {
  await client.connect();

  const collection = client.db("linktree").collection("links");
  const handles = await collection
    .find({}, { projection: { handle: 1 } })
    .toArray();
  const counts = new Map();

  for (const { handle } of handles) {
    if (typeof handle !== "string") continue;

    const normalizedHandle = handle.trim().toLowerCase();
    counts.set(normalizedHandle, (counts.get(normalizedHandle) || 0) + 1);
  }

  const duplicateCount = [...counts.values()].filter((count) => count > 1).length;
  if (duplicateCount > 0) {
    throw new Error(
      `Cannot create the unique handle index: ${duplicateCount} duplicate handle value(s) exist.`
    );
  }

  await collection.createIndex(
    { handle: 1 },
    {
      name: "unique_handle",
      unique: true,
      collation: { locale: "en", strength: 2 },
      partialFilterExpression: { handle: { $type: "string" } },
    }
  );

  console.log("The unique_handle index is ready.");
} finally {
  await client.close();
}
