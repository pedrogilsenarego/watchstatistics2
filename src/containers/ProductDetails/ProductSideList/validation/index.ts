import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  caseSize: Yup.number().typeError(i18n.t('validation.number'))
  .min(20,i18n.t('validation.moreT20'))
  .max(60,i18n.t('validation.lessT60')),
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
