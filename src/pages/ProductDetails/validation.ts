import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  productBrand: Yup.string().required(i18n.t("validation.required")),
  productName: Yup.string().required(i18n.t("validation.required")),
  reference: Yup.string().required(i18n.t("validation.required")),
  productThumbnail: Yup.array()
    .of(Yup.string())
    .required(i18n.t("validation.required")),
});
