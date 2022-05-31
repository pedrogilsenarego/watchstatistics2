import Button3 from "src/components/Buttons/Button3";

const RightIconsNoUser = ({ setMobileDrawerSecondary, search }) => {
  return (
    <>
      {!search && <Button3 title='enter' onClick={() => setMobileDrawerSecondary(true)} />}
    </>
  );
};

export default RightIconsNoUser;
