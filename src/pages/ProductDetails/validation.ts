import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  productBrand: Yup.string().required(i18n.t("validation.required")),
  productName: Yup.string().required(i18n.t("validation.required")),
  reference: Yup.string().required(i18n.t("validation.required")),
  productThumbnail: Yup.string()
    .matches(
      // eslint-disable-next-line
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      i18n.t("validation.url")
    )
    .required(i18n.t("validation.required")),
});
