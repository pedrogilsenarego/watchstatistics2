import Popup from "src/components/Popup";
import { Typography } from "@mui/material";


interface Props {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
  title: string;
  children: string;
}

const OpenBoxesPopup = ({ openPopup, setOpenPopup, title, children }: Props) => {
  return (
    <>
      <Popup
        title={title}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        clickToClose
      >
        <>
          <Typography>
            {children}
          </Typography>
        </>
      </Popup>
    </>
  );
};

export default OpenBoxesPopup;
