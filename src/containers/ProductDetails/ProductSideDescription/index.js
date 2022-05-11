import { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import AddDescription from "./AddDescription";
import AdditionalData from "./AdditionalData";
import { rewards } from "src/constants/gamification";

const mapState = (state) => ({
  product: state.productsData.product,
});

// eslint-disable-next-line
const ProductSideDescription = ({}) => {
  const { product } = useSelector(mapState);
  const [addDescription, setAddDescription] = useState(false);
  const { productDesc, additionalData } = product;

  return (
    <div>
      <Box style={{ marginTop: "10px" }} color={"text.secondary"}>
        <Typography
          variant={"h6"}
          style={{ paddingLeft: "10px", color: "#ffffff" }}
        >
          Description
        </Typography>
        <Box style={{ padding: "10px" }}>
          {productDesc !== "" ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: productDesc }}
              align='justify'
              style={{
                marginTop: "5px",
                color: "#ffffffBF",
              }}
            />
          ) : !addDescription ? (
            <Typography
              style={{
                color: "#ffffffBF",
              }}
            >
              There is no description for this watch yet,{" "}
              <b
                onClick={() => {
                  setAddDescription(true);
                }}
                style={{ color: "orange", cursor: "pointer" }}
              >
                click here
              </b>{" "}
              to add a description and win{" "}
              <b style={{ color: "orange" }}>{rewards.PRODUCT_DESCRIPTION}</b>{" "}
              points.
            </Typography>
          ) : (
            <AddDescription setOpen={setAddDescription} />
          )}
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Divider style={{ background: "#ffffff66" }} />
      </Box>
      <AdditionalData additionalData={additionalData} />
    </div>
  );
};

export default ProductSideDescription;
