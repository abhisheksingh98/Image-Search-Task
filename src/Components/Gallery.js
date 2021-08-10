import React from "react";
import Masonry from "react-masonry-component";
import Image from "./Image";
import {composeImgUrl} from "../utils/composeImgUrl";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function Gallery({ imgArray, openPopup }) {
  if (imgArray.length > 0) {
    return (
      <Masonry className="gallery" options={{ fitWidth: true }}>
        {imgArray.map((imgData) => {
          return (
            <Image
              url={composeImgUrl(imgData)}
              key={imgData.id}
              openPopup={openPopup}
            />
          );
        })}
      </Masonry>
    );
  } else {
    return (
      <div className="alert-wrapper">
        <Alert justifyContent={"center"} status="info">
          <AlertIcon />
          No images found!
        </Alert>
      </div>
    );
  }
}
