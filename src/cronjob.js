import { schedule } from "node-cron";
import { autoSendMessageToUser } from './producers/dailyAutoSendMessageToUser';

const scheduledJobFunction = schedule("10 9,10,15,19 * * *", async () => {
  autoSendMessageToUser();
});
scheduledJobFunction.start();
