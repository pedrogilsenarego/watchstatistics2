import { useEffect, useState } from "react";
import * as GeneralStyled from "src/styles/styles";
import { useField } from "formik";

const MIN_CHARACTERS = 8;

const ValidationHelper = () => {
  const [field, , ,] = useField("password");
  const [characters, setCharacters] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);

  const isUpperCase = (word: string) => {
    var result = false;
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === word.charAt(0).toUpperCase()) result = true;
    }
    return result
  }

  const isLowerCase = (word: string) => {
    var result = false;
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === word.charAt(0).toLowerCase()) result = true;
    }
    return result
  }

  console.log(field.value)
  console.log(isUpperCase(field.value))

  useEffect(() => {
    if (field.value.length >= MIN_CHARACTERS) setCharacters(true);
    else setCharacters(false);
    if (isUpperCase(field.value) && field.value.length > 0) setUppercase(true);
    else setUppercase(false);
    if (isLowerCase(field.value) && field.value.length > 0) setLowercase(true);
    else setLowercase(false);
  }, [field.value]);

  return (
    <GeneralStyled.DashedGrid
      style={{ position: "absolute", right: "15vw", top: "30vh" }}
    >
      <GeneralStyled.BasicTypography color={characters ? "white" : "#ffffff66"}>
        &#9900;&nbsp;Contain {MIN_CHARACTERS} characters
      </GeneralStyled.BasicTypography>
      <GeneralStyled.BasicTypography color={uppercase ? "white" : "#ffffff66"}>
        &#9900;&nbsp;One Uppercase
      </GeneralStyled.BasicTypography>
      <GeneralStyled.BasicTypography color={lowercase ? "white" : "#ffffff66"}>
        &#9900;&nbsp;One LowerCase
      </GeneralStyled.BasicTypography>
      <GeneralStyled.BasicTypography>
        &#9900;&nbsp;One Number
      </GeneralStyled.BasicTypography>
      <GeneralStyled.BasicTypography>
        &#9900;&nbsp;One Special Character
      </GeneralStyled.BasicTypography>
    </GeneralStyled.DashedGrid>
  );
};
export default ValidationHelper;
