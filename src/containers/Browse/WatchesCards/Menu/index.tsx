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

} from "react-icons/bs";
import { AiFillCloseSquare } from "react-icons/ai";
import DrawerMine from "../../../../components/Drawer";
import FiltersMobile from "./FiltersMobile";
import Chip1 from "src/components/Chips/Chip1";
import MobileBottomAppBar from "src/components/MobileBottomAppBar";
import { bottomMenuButtons } from "./constant";

interface Props {
  dummyProductBrands: any;
  setDummyProductBrands: (productBrands: any) => void;
  productBrands: any;
  setProductBrands: (productBrands: any) => void;
  productCategory: any;
  setProductCategory: (productCategory: any) => void;
  dummyProductCategory: any;
  setDummyProductCategory: (dummyProductCategory: any) => void;
  dummyProductPrices: any;
  setDummyProductPrices: (productPrices: any) => void;
  productPrices: any;
  setProductPrices: (productPrices: any) => void;
  dummyScore: "asc" | "desc";
  setDummyScore: (score: "asc" | "desc") => void;
  score: "asc" | "desc";
  setScore: (score: "asc" | "desc") => void;
  handleFetchProducts: () => void;
  filtersVisible: boolean;
  setFiltersVisible: (filtersVisible: boolean) => void;
}

const Menu = ({
  dummyProductBrands,
  setDummyProductBrands,
  setProductBrands,
  productBrands,
  productCategory,
  dummyProductCategory,
  setProductCategory,
  setDummyProductCategory,
  dummyProductPrices,
  setDummyProductPrices,
  productPrices,
  setProductPrices,
  dummyScore,
  setDummyScore,
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
    setDummyProductBrands(null);
    setProductBrands(null);
    setDummyProductCategory(null);
    setProductPrices(null);
    setDummyProductPrices(null);
    setDummyScore("desc");
    handleFetchProducts();
  };

  const configFiltersMobile = {
    setFiltersVisible,
    handleClearFilters,
    productCategory,
    dummyProductCategory,
    setProductCategory,
    setDummyProductCategory,
    dummyProductBrands,
    setDummyProductBrands,
    productBrands,
    setProductBrands,
    dummyProductPrices,
    setDummyProductPrices,
    productPrices,
    setProductPrices,
    dummyScore,
    setDummyScore,
    score,
    setScore,
    handleFetchProducts,
  };

  const handleVisibleFilters = () => {
    setFiltersVisible(true);
  };

  const renderLaptop = () => {
    return (
      <>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11.5}>
          <Styled.Paper>
            <Grid container alignItems='center'>
              <Grid
                container
                item
                alignItems='center'
                justifyContent='center'
                columnSpacing={2.5}
                xs={12}
              >
                <Grid item container alignItems='center' xs={3}>
                  <Grid item xs={12}>
                    <Select
                      endAdornment={
                        productBrands !== null && (
                          <InputAdornment position='end'>
                            <AiFillCloseSquare
                              size='2em'
                              color='lightGrey'
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
                <Grid item container alignItems='center' xs={3}>
                  <Grid item xs={12}>
                    <Select
                      {...configCategory}
                      endAdornment={
                        productCategory !== null && (
                          <InputAdornment position='end'>
                            <AiFillCloseSquare
                              size='2em'
                              color='lightGrey'
                              style={{ cursor: "pointer" }}
                              onClick={() => setProductCategory(null)}
                            />
                          </InputAdornment>
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item container alignItems='center' xs={3}>
                  <Grid item xs={12}>
                    <Select
                      {...configPricesBracket}
                      endAdornment={
                        productPrices !== null && (
                          <InputAdornment position='end'>
                            <AiFillCloseSquare
                              size='2em'
                              color='lightGrey'
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
                      size='3em'
                      color={score === "desc" ? "orange" : "#ffffff66"}
                    />
                    <BsFileArrowUpFill
                      onClick={() => setScore("asc")}
                      size='3em'
                      color={score === "asc" ? "orange" : "#ffffff66"}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='center' xs={3}></Grid>
            </Grid>
          </Styled.Paper>
        </Grid>
      </>
    );
  };

  const productCategoryFilter = () => {
    if (productCategory)
      return {
        onClick: () => {
          setProductCategory(null);
          setDummyProductCategory(null);
        },
        icon: (
          <Chip1 bColor='#ffffff66' color='#ffffff' title={productCategory} />
        ),
      };
    else return;
  };

  const productPricesFilter = () => {
    if (productPrices)
      return {
        onClick: () => {
          setProductPrices(null);
          setDummyProductPrices(null);
        },
        icon: (
          <Chip1 bColor='#ffffff66' color='#ffffff' title={productPrices} />
        ),
      };
    else return;
  };

  const productBrandFilter = () => {
    if (productBrands)
      return {
        onClick: () => {
          setProductBrands(null);
          setDummyProductBrands(null);
        },
        icon: (
          <Chip1 bColor='#ffffff66' color='#ffffff' title={productBrands} />
        ),
      };
    else return;
  };

  const renderMobile = () => {
    return (
      <>
        <MobileBottomAppBar
          columnGap={2}
          paddingLeft="15px"
          justifyContent="start"
          listButtons={bottomMenuButtons(
            handleVisibleFilters,
            productCategoryFilter(),
            productPricesFilter(),
            productBrandFilter()
          )}
        />
      </>
    );
  };

  return (
    <>
      <Grid container xs={12}>
        {!isMatch && renderLaptop()}
      </Grid>
      {isMatch && renderMobile()}
      {isMatch && (
        <DrawerMine
          id={0}
          fullHeight
          position='bottom'
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
