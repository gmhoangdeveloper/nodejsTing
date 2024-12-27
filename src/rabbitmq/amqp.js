require("dotenv").config();
import { connect } from 'amqplib/callback_api';
// const rabbitUrl = 'amqp://beshop:123456@'+ process.env.URL_RABBITMQ;
const rabbitUrl = process.env.RABBITMQ_URL;
import moment from 'moment';

export function sendMessageToQueue(queue_name, data){
    connect(rabbitUrl, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            let msg = JSON.stringify(data);
            let time = moment().format('DD/MM/YYYY, HH:mm:ss');

            channel.assertQueue(queue_name, {
                durable: true
            });
            channel.sendToQueue(queue_name, Buffer.from(msg), {
                persistent: true
            });
            console.log("[%s][queue:%s] Sent '%s'", time, queue_name, msg);
        });
        setTimeout(function() {
            connection.close();
        }, 500);
    });
}
