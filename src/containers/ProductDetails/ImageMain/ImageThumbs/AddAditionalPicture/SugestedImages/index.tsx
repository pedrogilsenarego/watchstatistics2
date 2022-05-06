import { useState } from "react";
import { getImages } from "src/Api/googleSearch";
import Button2 from "src/components/Buttons/Button2";
import { Grid } from "@mui/material";
import { openWindowInNewTab } from "src/Utils";

const SugestedImages = ({ product }: any) => {
  const [images, setImages] = useState<any>([]);
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
  console.log(images);

  return (
    <div>
      <Button2 title='teste' onClick={handleGetImages} />
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
    </div>
  );
};

export default SugestedImages;
