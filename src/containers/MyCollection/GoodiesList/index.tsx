
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapParts } from "./constants/mapper";
import useGoodiesList from "./useGoodiesList";
import { Grid, Container, Tooltip } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import BoxesPopup from "src/componentsMixed/BoxesPopup";
import OpenBoxesPopup from "src/componentsMixed/OpenBoxesPopup";
import { AiOutlineCodeSandbox } from "react-icons/ai";

const GoodiesList = () => {
  const {
    handleAction,
    currentUser,
    helperPopup,
    setHelperPopup,
    title,
    typeOfBox,
    handleBoxPopup,
    handleOpenBox,
    openBoxPopup,
    setOpenBoxPopUp,
    popUpInfo,
    openBoxDisabled
  } = useGoodiesList();

  interface ListItemProps {
    title: string;
    typeOfBox: string;
    box?: boolean;
  }

  const ListItem = ({ title, typeOfBox, box }: ListItemProps) => {
    const openBox = openBoxDisabled(typeOfBox)
    return (
      <Container>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <GeneralStyled.BasicTypography
              style={{ cursor: "pointer" }}
              onClick={() => (box ? handleBoxPopup(typeOfBox) : null)}
            >
              {title}: {currentUser?.[typeOfBox] || 0}
            </GeneralStyled.BasicTypography>
          </Grid>
          <Tooltip
            disableHoverListener={box ? false : true}
            arrow
            placement='top'
            title={openBox ? `You have to many parts or no ${title}` : `open ${title}`}
          >
            <Grid item>
              <AiOutlineCodeSandbox
                onClick={() => openBox ? null : handleOpenBox(typeOfBox)}
                style={{ cursor: "pointer" }}
                color={
                  box
                    ? openBox
                      ? "#ffffff66"
                      : "white"
                    : "transparent"
                }
                size='1.5em'
              />
            </Grid>
          </Tooltip>
        </Grid>
      </Container>
    );
  };

  return (
    <>
      <BoxesPopup
        openPopup={helperPopup}
        setOpenPopup={setHelperPopup}
        title={title}
        typeOfBox={typeOfBox}
      />
      <OpenBoxesPopup
        openPopup={openBoxPopup}
        setOpenPopup={setOpenBoxPopUp}
        title="You opened a box"
        children={popUpInfo}
      />
      <Grid container columnSpacing={2} rowGap={2} mt='20px'>
        <Grid item xs={12} sm={6} textAlign='end'>
          <GeneralStyled.Card specialborder="special" style={{ textAlign: "center" }}>
            <ListItem title='Boosters' typeOfBox='boosters' />
            <ListItem title='White Box' typeOfBox='whiteBox' box />
            <ListItem title='Blue Box' typeOfBox='blueBox' box />
            <ListItem title='Purple Box' typeOfBox='purpleBox' box />
          </GeneralStyled.Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableList
            onAction={handleAction}
            columns={tableColumns}
            rows={mapParts(currentUser?.watchParts ?? []).rows}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GoodiesList;
