export const JSONToURLSearchParams = (data: {
  [key: string]: any;
}): URLSearchParams => {
  const urlParams = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      if (Array.isArray(value)) {
        urlParams.set(key, value.join(","));
      } else {
        urlParams.set(key, value.toString());
      }
    }
  });

  return urlParams;
};
