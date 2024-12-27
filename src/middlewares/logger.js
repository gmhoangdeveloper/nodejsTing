import { setLogger } from '../repositories/logger.repository';
const logger = async (req, res, next) => {
  const userId = req.userId;
  await setLogger(userId);
  return next();
};

export default logger;
