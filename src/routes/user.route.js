import express from 'express';
import {
  userLogout
} from '../controllers/user.controller';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/logout', userLogout);

module.exports = router;
