import * as Styled from "./styles";
import { Grid, useMediaQuery, useTheme, InputAdornment } from "@mui/material";
import { Box } from "@material-ui/core";
import Select from "../../../forms/SelectMUI";
import watchBrands from "../../../../assets/data/watchBrands.json";
import watchTypes from "../../../../assets/data/watchTypes.json";
import pricesBracket from "../../../../assets/data/pricesBracket.json";
import {
  BsFileArrowUpFill,
  BsFileArrowDownFill,
  BsSliders,
} from "react-icons/bs";
import { AiFillCloseSquare } from "react-icons/ai";
import DrawerMine from "../../../../components/Drawer";
import FiltersMobile from "./FiltersMobile";
import Chip1 from "src/components/Chips/Chip1";

interface Props {
  productBrands: any;
  setProductBrands: (productBrands: any) => void;
  productCategory: any;
  setProductCategory: (productCategory: any) => void;
  productPrices: any;
  setProductPrices: (productPrices: any) => void;
  score: "asc" | "desc";
  setScore: (score: "asc" | "desc") => void;
  handleFetchProducts: () => void;
  filtersVisible: boolean;
  setFiltersVisible: (filtersVisible: boolean) => void;
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
  handleFetchProducts,
  filtersVisible,
  setFiltersVisible,
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

  const handleClearFilters = () => {
    setProductBrands(null);
    setProductCategory(null);
    setProductPrices(null);
    handleFetchProducts();
  };

  const configFiltersMobile = {
    setFiltersVisible,
    handleClearFilters,
    productCategory,
    setProductCategory,
    productBrands,
    setProductBrands,
    productPrices,
    setProductPrices,
    score,
    setScore,
    handleFetchProducts,
  };

  const renderLaptop = () => {
    return (
      <>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11.5}>
          <Styled.Paper>
            <Grid container alignItems="center">
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                columnSpacing={2.5}
                xs={12}
              >
                <Grid item container alignItems="center" xs={3}>
                  <Grid item xs={12}>
                    <Select
                      endAdornment={
                        productBrands !== null && (
                          <InputAdornment position="end">
                            <AiFillCloseSquare
                              size="2em"
                              color="lightGrey"
                              style={{ cursor: "pointer" }}
                              onClick={() => setProductBrands(null)}
                            />
                          </InputAdornment>
                        )
                      }
                      {...configBrands}
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" xs={3}>
                  <Grid item xs={12}>
                    <Select
                      {...configCategory}
                      endAdornment={
                        productCategory !== null && (
                          <InputAdornment position="end">
                            <AiFillCloseSquare
                              size="2em"
                              color="lightGrey"
                              style={{ cursor: "pointer" }}
                              onClick={() => setProductCategory(null)}
                            />
                          </InputAdornment>
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" xs={3}>
                  <Grid item xs={12}>
                    <Select
                      {...configPricesBracket}
                      endAdornment={
                        productPrices !== null && (
                          <InputAdornment position="end">
                            <AiFillCloseSquare
                              size="2em"
                              color="lightGrey"
                              style={{ cursor: "pointer" }}
                              onClick={() => setProductPrices(null)}
                            />
                          </InputAdornment>
                        )
                      }
                    />
                  </Grid>
                </Grid>

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
              </Grid>
              <Grid container justifyContent="center" xs={3}></Grid>
            </Grid>
          </Styled.Paper>
        </Grid>
      </>
    );
  };

  const renderMobile = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Styled.FiltersBox onClick={() => setFiltersVisible(true)}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Styled.FiltersTypography>Filters</Styled.FiltersTypography>
              </Grid>
              <Grid item>
                <BsSliders size="2em" />
              </Grid>
            </Grid>
          </Styled.FiltersBox>
        </Grid>
        <Grid item container spacing={1} xs={8}>
          <Grid item>
            {productCategory && (
              <Chip1
                title={productCategory}
                onClick={() => setProductCategory(null)}
              />
            )}
          </Grid>
          <Grid item>
            {productPrices && (
              <Chip1
                title={productPrices}
                onClick={() => setProductPrices(null)}
              />
            )}
          </Grid>
          <Grid item>
            {productBrands && (
              <Chip1
                title={productBrands}
                onClick={() => setProductBrands(null)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid container xs={12}>
        {!isMatch && renderLaptop()}
        {isMatch && renderMobile()}
      </Grid>
      {isMatch && (
        <DrawerMine
          position="bottom"
          openDrawer={filtersVisible}
          setOpenDrawer={setFiltersVisible}
        >
          <FiltersMobile {...configFiltersMobile} />
        </DrawerMine>
      )}
    </>
  );
};

export default Menu;
