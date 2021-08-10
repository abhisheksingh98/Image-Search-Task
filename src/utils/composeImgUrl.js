export const composeImgUrl = (imgData, size = null) => {
  const { server, id, secret } = imgData;
  if (!size) {
    return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
  } else {
    return `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
  }
};
