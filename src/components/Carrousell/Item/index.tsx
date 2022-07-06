import CardMedia from "src/components/CardMedia";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import { ItemP } from "../types"

interface Props {
  item: ItemP
}

const Item = ({ item }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <CardMedia
        borderRadius='0px'
        height={mobile ? "90px" : "100px"}
        image={item.image ?? ""}
        alt=""
      />

      <Typography
        fontSize={"12px"}
        style={{ marginTop: "5px", fontWeight: "500" }}
      >
        {item.main || ""}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        {item.second}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        {item.third}
      </Typography>
    </>
  );
}

export default Item

