import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  productBrand: Yup.string().required(i18n.t("validation.required")),
  productName: Yup.string().required(i18n.t("validation.required")),
  reference: Yup.string().required(i18n.t("validation.required")),
  productThumbnail: Yup.array()
    .of(Yup.string())
    .required(i18n.t("validation.required"))
    .min(1,i18n.t("validation.onePicture")),
  productCategory: Yup.string().required(i18n.t("validation.required")),
  productPriceBrackets: Yup.string().required(i18n.t("validation.required")),
  productDesc: Yup.string()
  .max(2000, i18n.t("validation.maxCharacters")),
  caseSize: Yup.number().typeError(i18n.t('validation.number'))
  .min(20,i18n.t('validation.moreT20'))
  .max(60,i18n.t('validation.lessT60')),
  productionYearStart: Yup.number()
  .typeError(i18n.t('validation.number'))
  .min(1600,i18n.t('validation.moreT1600'))
  .max(2100,i18n.t('validation.lessT2100'))
  .lessThan(Yup.ref("productionYearEnd"), i18n.t('validation.lessTYearsEnd')),
  productionYearEnd: Yup.number()
  .typeError(i18n.t('validation.number'))
  .min(1600,i18n.t('validation.moreT1600'))
  .max(2100,i18n.t('validation.lessT2100'))
  .moreThan(Yup.ref("productionYearStart"), i18n.t('validation.moreTYearsStart')),
});
