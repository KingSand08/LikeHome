export const JSONToURLSearchParams = (JSON: {
  [key: string]: any;
}): URLSearchParams => {
  const urlParams = new URLSearchParams();
  Object.entries(JSON).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      if (Array.isArray(value)) {
        urlParams.append(key, value.join(","));
      } else {
        urlParams.append(key, value.toString());
      }
    }
  });
  return urlParams;
};
