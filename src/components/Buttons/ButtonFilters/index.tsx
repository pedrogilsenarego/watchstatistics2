import { useState } from "react";
import * as Styled from "./styles";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { Grid } from "@mui/material";
import DrawerMine from "src/components/Drawer";

interface Props {
  list: any;
  value: string | null;
  setValue: (value: string | null) => void;
}

const ButtonFilters = ({ list, value, setValue }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChooseValue = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <Styled.Box component='div'>
        {!value && (
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            onClick={handleChooseValue}
          >
            <Grid>
              <Styled.Typography>Choose</Styled.Typography>
            </Grid>
            <Grid>
              <MdArrowForwardIos size='2em' />
            </Grid>
          </Grid>
        )}
        {value && (
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            onClick={handleChooseValue}
          >
            <Grid>
              <Styled.Typography>{value}</Styled.Typography>
            </Grid>
            <Grid>
              <RiCloseFill
                size='2.5em'
                onClick={(e) => {
                  e.stopPropagation();
                  setValue(null);
                }}
              />
            </Grid>
          </Grid>
        )}
      </Styled.Box>
      (
      <DrawerMine
        id={1}
        position='top'
        openDrawer={drawerOpen}
        setOpenDrawer={setDrawerOpen}
        fullWidth
      >
        <MdArrowBackIosNew
          size='2em'
          color='lightGrey'
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
                <Styled.BoxList onClick={() => setValue(item.value)}>
                  <Styled.TypographyList>{item.name}</Styled.TypographyList>
                </Styled.BoxList>
              </Grid>
            );
          })}
        </Grid>
      </DrawerMine>
    </>
  );
};

export default ButtonFilters;
