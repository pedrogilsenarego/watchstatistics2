import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  productDesc: Yup.string()
    .max(2000, i18n.t("validation.maxCharacters"))
    .required(i18n.t("validation.required")),
});
