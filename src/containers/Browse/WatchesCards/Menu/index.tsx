import * as Styled from "./styles";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import { Box } from "@material-ui/core";
import Select from "../../../forms/SelectMUI";
import watchBrands from "../../../../assets/data/watchBrands.json";
import watchTypes from "../../../../assets/data/watchTypes.json";
import pricesBracket from "../../../../assets/data/pricesBracket.json";
import { BsFileArrowUpFill, BsFileArrowDownFill } from "react-icons/bs";
import { AiFillCloseSquare } from "react-icons/ai";

interface Props {
  productBrands: any;
  setProductBrands: (productBrands: any) => void;
  productCategory: any;
  setProductCategory: (productCategory: any) => void;
  productPrices: any;
  setProductPrices: (productPrices: any) => void;
  score: string;
  setScore: (score: string) => void;
}

const Menu = ({
  setProductBrands,
  productBrands,
  productCategory,
  setProductCategory,
  productPrices,
  setProductPrices,
  score,
  setScore,
}: Props) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const handleFilterBrands = (e: any) => {
    setProductBrands(e.target.value);
  };

  const handleFilterCategory = (e: any) => {
    setProductCategory(e.target.value);
  };

  const handleFilterPrices = (e: any) => {
    setProductPrices(e.target.value);
  };

  const configBrands = {
    defaultValue: productBrands,
    options: watchBrands.options,
    handleChange: handleFilterBrands,
    label: "Brands",
  };

  const configCategory = {
    defaultValue: productCategory,
    options: watchTypes.options,
    handleChange: handleFilterCategory,
    label: "Categories",
  };

  const configPricesBracket = {
    defaultValue: productPrices,
    options: pricesBracket.options,
    handleChange: handleFilterPrices,
    label: "Prices Bracket",
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={0.7}></Grid>
      <Grid item xs={11.3}>
        <Styled.Paper>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            columnSpacing={2.5}
            rowSpacing={isMatch ? 2 : 0}
            xs={9}
            sm={12}
          >
            <Grid item container alignItems="center" xs={12} md={3}>
              <Grid item xs={11}>
                <Select {...configBrands} />
              </Grid>
              <Grid item xs={1}>
                {productBrands !== null && (
                  <AiFillCloseSquare
                    size="2em"
                    color="lightGrey"
                    style={{ cursor: "pointer" }}
                    onClick={() => setProductBrands(null)}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} md={3}>
              <Grid item xs={11}>
                <Select {...configCategory} />
              </Grid>
              <Grid item xs={1}>
                {productCategory !== null && (
                  <AiFillCloseSquare
                    size="2em"
                    color="lightGrey"
                    style={{ cursor: "pointer" }}
                    onClick={() => setProductCategory(null)}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item container alignItems="center" xs={12} md={3}>
              <Grid item xs={11}>
                <Select {...configPricesBracket} />
              </Grid>
              <Grid item xs={1}>
                {productPrices !== null && (
                  <AiFillCloseSquare
                    size="2em"
                    color="lightGrey"
                    style={{ cursor: "pointer" }}
                    onClick={() => setProductPrices(null)}
                  />
                )}
              </Grid>
            </Grid>
            {!isMatch && (
              <Grid item xs={12} md={3}>
                <Box
                  style={{
                    fontSize: "15px",
                    color: "#ffffff66",
                    cursor: "pointer",
                    borderBottom: "none",
                  }}
                >
                  <BsFileArrowDownFill
                    onClick={() => setScore("desc")}
                    size="3em"
                    color={score === "desc" ? "orange" : "#ffffff66"}
                  />
                  <BsFileArrowUpFill
                    onClick={() => setScore("asc")}
                    size="3em"
                    color={score === "asc" ? "orange" : "#ffffff66"}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          {isMatch && (
            <Grid item container xs={3}>
              {" "}
              <Box
                style={{
                  fontSize: "15px",
                  color: "#ffffff66",
                  cursor: "pointer",
                  borderBottom: "none",
                }}
              >
                <BsFileArrowDownFill
                  onClick={() => setScore("desc")}
                  size="3em"
                  color={score === "desc" ? "orange" : "#ffffff66"}
                />
                <BsFileArrowUpFill
                  onClick={() => setScore("asc")}
                  size="3em"
                  color={score === "asc" ? "orange" : "#ffffff66"}
                />
              </Box>
            </Grid>
          )}
        </Styled.Paper>
      </Grid>
    </Grid>
  );
};

export default Menu;
