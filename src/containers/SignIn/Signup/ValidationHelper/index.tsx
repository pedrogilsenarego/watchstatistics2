import { useEffect, useState } from "react";
import * as GeneralStyled from "src/styles/styles";
import { useField } from "formik";
import {
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
} from "src/Utils/stringUtils";

const MIN_CHARACTERS = 8;

interface Props {
  mobile: boolean;
}

const ValidationHelper = ({ mobile }: Props) => {
  const [field, , ,] = useField("password");
  const [characters, setCharacters] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  useEffect(() => {
    if (field.value.length >= MIN_CHARACTERS) setCharacters(true);
    else setCharacters(false);
    if (hasUpperCase(field.value) && field.value.length > 0) setUppercase(true);
    else setUppercase(false);
    if (hasLowerCase(field.value) && field.value.length > 0) setLowercase(true);
    else setLowercase(false);
    if (hasNumber(field.value) && field.value.length > 0) setNumber(true);
    else setNumber(false);
    if (hasSpecialChar(field.value) && field.value.length > 0)
      setSpecialChar(true);
    else setSpecialChar(false);
  }, [field.value]);

  return (
    <>
      {field.value.length > 0 && (
        <GeneralStyled.DashedGrid
          style={{
            position: mobile ? "relative" : "absolute",
            right: mobile ? "auto" : "13vw",
            top: mobile ? "auto" : "27vh",
          }}
        >
          <GeneralStyled.BasicTypography
            color={characters ? "#ffffffCE" : "#ffffff66"}
          >
            &#9900;&nbsp;Contain {MIN_CHARACTERS} characters
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography
            color={uppercase ? "#ffffffCE" : "#ffffff66"}
          >
            &#9900;&nbsp;One Uppercase
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography
            color={lowercase ? "#ffffffCE" : "#ffffff66"}
          >
            &#9900;&nbsp;One LowerCase
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography color={number ? "#ffffffCE" : "#ffffff66"}>
            &#9900;&nbsp;One Number
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography
            color={specialChar ? "#ffffffCE" : "#ffffff66"}
          >
            &#9900;&nbsp;One Special Character
          </GeneralStyled.BasicTypography>
        </GeneralStyled.DashedGrid>
      )}
    </>
  );
};
export default ValidationHelper;
