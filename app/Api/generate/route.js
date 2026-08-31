import clientPromise from "@/lib/mongodb";
import {
  HANDLE_COLLATION,
  ensureUniqueHandleIndex,
  validateHandle,
  validateLinktreePayload,
} from "@/lib/linktree";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const handleValidation = validateHandle(searchParams.get("handle"));

  if (!handleValidation.valid) {
    return Response.json(
      { success: false, message: handleValidation.message },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const collection = client.db("linktree").collection("links");
    await ensureUniqueHandleIndex(collection);
    const doc = await collection.findOne(
      { handle: handleValidation.value },
      { collation: HANDLE_COLLATION }
    );

    return Response.json({ success: true, available: !doc });
  } catch {
    return Response.json(
      { success: false, message: "Unable to check handle availability." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const payloadValidation = validateLinktreePayload(body);
  if (!payloadValidation.valid) {
    return Response.json(
      { success: false, message: payloadValidation.message },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const collection = client.db("linktree").collection("links");
    await ensureUniqueHandleIndex(collection);
    const result = await collection.insertOne(payloadValidation.value);

    return Response.json(
      {
        success: true,
        error: false,
        message: "Linktree added successfully",
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Handle already taken, try another.",
        },
        { status: 409 }
      );
    }

    return Response.json(
      {
        success: false,
        error: true,
        message: "Unable to create your Linktree. Please try again.",
      },
      { status: 500 }
    );
  }
}
