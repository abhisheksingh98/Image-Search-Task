import React from "react";

export default function Image({ url, openPopup }) {
  return (
    <div>
      <img
        className="gallery__image"
        src={url}
        alt=""
        onClick={() => openPopup(url)}
      />
    </div>
  );
}
