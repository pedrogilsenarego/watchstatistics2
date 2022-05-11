import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  caseSize: Yup.string().matches(/^[0-9]+$/,i18n.t('validation.number')).matches(/^(6[0-9]|2[1-9])$/,"Choose a number between 20 and 70"),
  productionYearsStart: Yup.number()
  .typeError(i18n.t('validation.number'))
  .min(1600,i18n.t('validation.moreT1600'))
  .max(2100,i18n.t('validation.lessT2100'))
  .lessThan(Yup.ref("productionYearsEnd"), i18n.t('validation.lessTYearsEnd')),
  productionYearsEnd: Yup.number()
  .typeError(i18n.t('validation.number'))
  .min(1600,i18n.t('validation.moreT1600'))
  .max(2100,i18n.t('validation.lessT2100'))
  .moreThan(Yup.ref("productionYearsStart"), i18n.t('validation.moreTYearsStart')),
});
