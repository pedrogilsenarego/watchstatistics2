import Button3 from "src/components/Buttons/Button3";

const RightIconsNoUser = ({ handleSignupOpen, handleLoginOpen, search }) => {
  return (
    <>
      {!search && <Button3 title='enter' onClick={(e) => handleLoginOpen(e)} />}
    </>
  );
};

export default RightIconsNoUser;
