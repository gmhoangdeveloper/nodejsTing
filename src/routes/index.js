const express = require('express');
const router = express.Router();

import { countTotalUser, countUser } from '../repositories/user.repository';
import { analysisTask, completedServiceCountByUser} from '../repositories/task.repository';
import { totalMoneyComposit } from '../repositories/transaction.repository';
import { verifyStaffToken } from '../middlewares/auth';

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Ting.vn' });
});

router.get('/analysis', verifyStaffToken, async function(req, res, next) {
  const { from_date, to_date } = req.query;
  const totalUser = await countTotalUser(from_date, to_date);
  const analysis = await analysisTask(from_date, to_date);
  const totalDepositMoney = await totalMoneyComposit(from_date, to_date);
  return res.status(200).json({
    code: 200,
    data: {
      total_user: totalUser,
      total_task_success: analysis.count,
      total_revenue: analysis.revenue,
      total_discount: analysis.discount,
      total_deposit_money: totalDepositMoney
    }
  });
});

router.get('/analysis-service-count-by-user', verifyStaffToken,  async function(req, res, next) {
  const { current_page = 1, limit = 20 , phone =null } = req.query;
  const totalUser = await countUser(phone);
  const totalPage = Math.ceil(totalUser / limit);
  const offset = limit * (current_page - 1);

  let nextPage = current_page + 1;
  if(nextPage > totalPage){
      nextPage = null;
  }

  let prevPage = current_page - 1;
  if(prevPage <= 0){
      prevPage = null
  }

  const results =  await completedServiceCountByUser(limit ,offset ,phone)
  return res.status(200).json({
   code: 200,
   data:  results,
   total_page: totalPage,
   current_page: current_page,
   prev_page: prevPage,
   next_page: nextPage,
   limit: limit,
   total_user: totalUser
 });
 });
 
module.exports = router;