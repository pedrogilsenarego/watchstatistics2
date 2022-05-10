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
    <Grid container style={{ maxHeight: "50vh", overflowY: "auto", marginBottom: "10px" }}>
      {!googleImages && (
        <Grid item textAlign="start" xs={12} style={{marginLeft: "10px"}}>
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
        </Typography></Grid>
      )}
      {googleImages && (
        <Grid container justifyContent='center'>
          {images?.map((image: any, index: number) => {
            return (
              <Grid item key={index}>
                <img
                  src={image?.image?.src}
                  loading='lazy'
                  alt=''
                  style={{ cursor: "pointer", width: "80px", height: "110px", objectFit: "cover", }}
                  onClick={() => openWindowInNewTab(image?.link?.href)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default SugestedImages;
