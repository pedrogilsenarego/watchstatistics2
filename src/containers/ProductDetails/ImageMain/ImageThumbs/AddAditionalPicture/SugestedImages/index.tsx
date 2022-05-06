import { useState, useEffect } from "react";
import { getImages } from "src/Api/googleSearch";

import { Grid, Typography } from "@mui/material";
import { openWindowInNewTab } from "src/Utils";

const SugestedImages = ({ product }: any) => {
  const [images, setImages] = useState<any>([]);
  const [googleImages, setGoogleImages] = useState(false);
  const { productBrand, productName, reference } = product;
  const query = `${productBrand} ${productName} ${reference}`;

  const handleGetImages = async () => {
    try {
      const response = await getImages(query);
      setImages(response?.image_results);
    } catch {
      console.log("fail");
    }
  };

  useEffect(() => {
    if (googleImages) handleGetImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleImages]);

  return (
    <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
      {!googleImages && (
        <Typography
          style={{
            color: "#ffffffBF",
          }}
        >
          Search{" "}
          <b
            onClick={() => setGoogleImages(true)}
            style={{ color: "orange", cursor: "pointer" }}
          >
            Google
          </b>{" "}
          for sugested images
        </Typography>
      )}
      {googleImages && (
        <Grid container justifyContent='space-evenly'>
          {images?.map((image: any, index: number) => {
            return (
              <Grid item key={index}>
                <img
                  src={image?.image?.src}
                  loading='lazy'
                  alt=''
                  style={{ cursor: "pointer" }}
                  onClick={() => openWindowInNewTab(image?.link?.href)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default SugestedImages;
