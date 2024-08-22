export const parseUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const origin = parsedUrl.origin;
  const path = parsedUrl.pathname;
  const hash = parsedUrl.hash.startsWith('#')
    ? parsedUrl.hash.slice(1)
    : parsedUrl.hash;
  return { path, hash, origin };
};
