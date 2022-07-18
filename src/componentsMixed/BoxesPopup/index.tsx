import Popup from "src/components/Popup"


interface Props {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
}

const BoxesPopup = ({ openPopup, setOpenPopup }: Props) => {

  return (
    <><Popup title="teste" openPopup={openPopup} setOpenPopup={setOpenPopup} clickToClose>
      <>Teste</>
    </Popup></>
  )
}

export default BoxesPopup