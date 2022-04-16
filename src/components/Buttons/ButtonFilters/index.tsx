import { useState } from "react";
import * as Styled from "./styles";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { Grid } from "@mui/material";
import DrawerMine from "src/components/Drawer";

interface Props {
  list: any;
}

const ButtonFilters = ({ list }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Styled.Box
        component="div"
        onClick={() => {
          setDrawerOpen(true);
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Styled.Typography>Choose</Styled.Typography>
          </Grid>
          <Grid>
            <MdArrowForwardIos size="2em" />
          </Grid>
        </Grid>
      </Styled.Box>
      {drawerOpen && (
        <DrawerMine
          position="bottom"
          openDrawer={drawerOpen}
          setOpenDrawer={setDrawerOpen}
          fullWidth
        >
          <MdArrowBackIosNew
            size="2em"
            color="lightGrey"
            onClick={() => setDrawerOpen(false)}
          />
          <Grid container rowSpacing={2} style={{ marginTop: "10px" }}>
            {list.map((item: any, pos: number) => {
              return (
                <Grid
                  item
                  xs={12}
                  key={pos}
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  <Styled.BoxList>
                    <Styled.TypographyList>{item.name}</Styled.TypographyList>
                  </Styled.BoxList>
                </Grid>
              );
            })}
          </Grid>
        </DrawerMine>
      )}
    </>
  );
};

export default ButtonFilters;
