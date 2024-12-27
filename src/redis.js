require("dotenv").config();
import { createClient } from 'redis';
const client = createClient({
    // url: 'redis://:123456@127.0.0.1:6379/10'
    url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const LIST_PARTNER_ACCEPT = 'LIST_PARTNER_ACCEPT';
const LIST_JOB_ACCEPT = 'LIST_JOB_ACCEPT';
const LIST_JOB_NEW = 'LIST_JOB_NEW';

//partner already accept job

export async function partnerAcceptJobRedis(PARTNER_ID, SERVICE_CODE){
    const key2 = `${LIST_JOB_ACCEPT}:${PARTNER_ID}`;
    const field2 = `${SERVICE_CODE}:${PARTNER_ID}`;
    const value2 = SERVICE_CODE;
    await client.hSet(key2, field2, value2);

}