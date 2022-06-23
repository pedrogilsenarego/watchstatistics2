import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSuccessNotification } from "src/redux/general/general.actions";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";

interface Props {
  shredderMeter: any;
  handleDeleteWatchParts: any;
  list: any;
  setOpenConfirmDelete: any;
}

const useShredder = ({
  shredderMeter,
  handleDeleteWatchParts,
  list,
  setOpenConfirmDelete,
}: Props) => {
  const valueFromPart = shredderMeter(list[2].items);
  const [loadingButton, setLoadingButton] = useState(false);
  const [noPartsError, setNoPartsError] = useState(false);
  const dispatch = useDispatch();
  const handleShredPart = async () => {
    setLoadingButton(true);
    try {
      await handleDeleteWatchParts(
        list[2].items,
        LinearProgressBarColor(valueFromPart),
        LinearProgressBarFormat(valueFromPart),
        LinearProgressBarColor2(valueFromPart)
      );
      dispatch(
        updateSuccessNotification("The parts were shredded into new parts")
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
      setOpenConfirmDelete(false);
    }
  };

  useEffect(() => {
    if (list[2]?.items?.length > 0) setNoPartsError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list[2]?.items]);
  return {
    noPartsError,
    valueFromPart,
    setNoPartsError,
    loadingButton,
    handleShredPart,
  };
};

export default useShredder;
