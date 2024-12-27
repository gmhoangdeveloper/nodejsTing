require('dotenv').config();
import i18n from 'i18n';

const setLanguage = async (req, res, next) => {
  const language = req.headers["x-language"];
  i18n.setLocale(res, language);
  req.language = language;
  return next();
};

export default setLanguage;
