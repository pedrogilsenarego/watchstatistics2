import * as Yup from "yup";
import { i18n } from "src/translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  caseSize: Yup.string().matches(/^[0-9]+$/,i18n.t('validation.number')).matches(/^(6[0-9]|2[1-9])$/,"Choose a number between 20 and 70"),
  productionYearsStart: Yup.string().matches(/^[0-9]+$/,i18n.t('validation.number')).matches(/^(160[0-9]|16[1-9][0-9]|1[7-9][0-9]{2}|20[0-9]{2}|2100)$/,"Choose a number between 1600 and 2100"),
  productionYearsEnd: Yup.string().matches(/^[0-9]+$/,i18n.t('validation.number')).matches(/^(160[0-9]|16[1-9][0-9]|1[7-9][0-9]{2}|20[0-9]{2}|2100)$/,"Choose a number between 1600 and 2100"),
});
