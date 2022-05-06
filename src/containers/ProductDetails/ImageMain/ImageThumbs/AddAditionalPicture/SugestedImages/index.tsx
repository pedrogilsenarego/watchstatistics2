import { useState } from "react";
import { getImages } from "src/Api/googleSearch";
import Button2 from "src/components/Buttons/Button2";
import { Grid } from "@mui/material";

const SugestedImages = () => {
  const [images, setImages] = useState<any>([]);

  const handleGetImages = async () => {
    try {
      const response = await getImages("Rolex submariner", 30);
      console.log("response", response);
      setImages(response);
    } catch {
      console.log("fail");
    }
  };

  return (
    <div>
      <Button2 title='teste' onClick={handleGetImages} />
      {images?.images_results?.map((image: any, index: number) => (
        <Grid item key={index}>
          <img src={image?.src} loading='lazy' alt='' />
        </Grid>
      ))}
    </div>
  );
};

export default SugestedImages;
