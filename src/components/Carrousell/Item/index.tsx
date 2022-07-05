import CardMedia from "src/components/CardMedia";
import { useTheme, useMediaQuery, Typography } from "@mui/material";

interface Props {
  item: any
}

const Item = ({ item }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <CardMedia
        borderRadius='0px'
        height={mobile ? "90px" : "100px"}
        image={item.productThumbnail?.[0] ?? ""}
        alt={item.productName}
      />

      <Typography
        fontSize={"12px"}
        style={{ marginTop: "5px", fontWeight: "500" }}
      >
        {item.productBrand} {item.productName}: {item.reference}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        Votes: {item.numberVotesOwn + item.numberVotesNotOwn} . Score:{" "}
        {item.avgTotal}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        {item.userID}
      </Typography>
    </>
  );
}

export default Item

