import { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import AddDescription from "./AddDescription";
import AdditionalData from "./AdditionalData";
import { rewards } from "src/constants/gamification";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

// eslint-disable-next-line
const ProductSideDescription = ({
  newWatch,
  productDesc,
  setProductDesc,
  additionalData,
  setAdditionalData,
}) => {
  const { currentUser } = useSelector(mapState);
  const [addDescription, setAddDescription] = useState(false);

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
          {productDesc !== "" && !newWatch ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: productDesc }}
              align='justify'
              style={{
                marginTop: "5px",
                color: "#ffffffBF",
              }}
            />
          ) : !currentUser ? (
            " "
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
            <AddDescription
              setOpen={setAddDescription}
              newWatch={newWatch}
              setProductDesc={setProductDesc}
              productDesc={productDesc}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Divider style={{ background: "#ffffff66" }} />
      </Box>
      <AdditionalData
        newWatch={newWatch}
        additionalData={additionalData}
        currentUser={currentUser}
        setAdditionalData={setAdditionalData}
      />
    </div>
  );
};

export default ProductSideDescription;
