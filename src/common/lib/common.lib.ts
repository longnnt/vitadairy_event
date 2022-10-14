export function toQueryString(objParams: any) {
  const str = [];
  for (const p in objParams) {
    // eslint-disable-next-line no-prototype-builtins
    if (objParams.hasOwnProperty(p) && objParams[p] + '') {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`);
    }
  }

  return '?' + str.join('&');
}
