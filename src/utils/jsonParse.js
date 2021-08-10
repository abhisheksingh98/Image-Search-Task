export const jsonParse = (flickrJson) => {
  const jsonData = flickrJson.substring(14, flickrJson.length - 1);
  return JSON.parse(jsonData);
};
