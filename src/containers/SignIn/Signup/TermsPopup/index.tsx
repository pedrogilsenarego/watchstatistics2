import Popup from "src/components/Popup";
import * as GeneralStyles from "src/styles/styles";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TermsPopup = ({ open, setOpen }: Props) => {
  return (
    <Popup
      title='Terms of service'
      openPopup={open}
      setOpenPopup={setOpen}
      clickToClose
    >
      <GeneralStyles.BasicTypography color='black'>
        All the data here obtained about the users and their choices are only
        used to populate the app. The data is never released to third party
        elements. The user can always ask their data to be released to them or deleted.
      </GeneralStyles.BasicTypography>
    </Popup>
  );
};

export default TermsPopup;
