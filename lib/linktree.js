const HANDLE_PATTERN = /^[a-z0-9_]{3,30}$/;
const MAX_LINKS = 20;
const MAX_LINK_TITLE_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 160;
export const HANDLE_COLLATION = { locale: "en", strength: 2 };

let handleIndexPromise;

export function normalizeHandle(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validateHandle(value) {
  const handle = normalizeHandle(value);

  if (!HANDLE_PATTERN.test(handle)) {
    return {
      valid: false,
      message:
        "Use 3–30 lowercase letters, numbers, or underscores for your handle.",
    };
  }

  return { valid: true, value: handle };
}

function validateHttpUrl(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    return { valid: false, message: `${fieldName} is required.` };
  }

  try {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      return { valid: false, message: `${fieldName} must use http or https.` };
    }

    return { valid: true, value: url.toString() };
  } catch {
    return { valid: false, message: `${fieldName} must be a valid URL.` };
  }
}

export function validateLinktreePayload(body) {
  const handleValidation = validateHandle(body?.handle);
  if (!handleValidation.valid) return handleValidation;

  const pictureValidation = validateHttpUrl(body?.pic, "Profile picture URL");
  if (!pictureValidation.valid) return pictureValidation;

  if (!Array.isArray(body?.links) || body.links.length === 0) {
    return { valid: false, message: "Add at least one link." };
  }

  if (body.links.length > MAX_LINKS) {
    return { valid: false, message: `You can add up to ${MAX_LINKS} links.` };
  }

  const links = [];
  for (const item of body.links) {
    const linktext = typeof item?.linktext === "string" ? item.linktext.trim() : "";
    if (!linktext || linktext.length > MAX_LINK_TITLE_LENGTH) {
      return {
        valid: false,
        message: `Each link title must be 1–${MAX_LINK_TITLE_LENGTH} characters.`,
      };
    }

    const urlValidation = validateHttpUrl(item?.link, "Link URL");
    if (!urlValidation.valid) return urlValidation;

    links.push({ linktext, link: urlValidation.value });
  }

  const desc = typeof body?.desc === "string" ? body.desc.trim() : "";
  if (desc.length > MAX_DESCRIPTION_LENGTH) {
    return {
      valid: false,
      message: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`,
    };
  }

  return {
    valid: true,
    value: {
      handle: handleValidation.value,
      pic: pictureValidation.value,
      desc,
      links,
    },
  };
}

export async function ensureUniqueHandleIndex(collection) {
  if (!handleIndexPromise) {
    handleIndexPromise = collection.createIndex(
      { handle: 1 },
      {
        name: "unique_handle",
        unique: true,
        collation: HANDLE_COLLATION,
        partialFilterExpression: { handle: { $type: "string" } },
      }
    );
  }

  try {
    await handleIndexPromise;
  } catch (error) {
    handleIndexPromise = undefined;
    throw error;
  }
}
