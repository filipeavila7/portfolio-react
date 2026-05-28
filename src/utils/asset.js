const externalPathPattern = /^(https?:)?\/\//;
const specialPathPattern = /^(data:|blob:|mailto:|tel:|#)/;

export function asset(path) {
  if (!path) {
    return import.meta.env.BASE_URL;
  }

  if (externalPathPattern.test(path) || specialPathPattern.test(path)) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalizedPath = String(path).replace(/^\/+/, "");

  return `${baseUrl}${normalizedPath}`;
}

export const getAsset = asset;
