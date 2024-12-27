import models from '../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export async function updateUserInfo(userId, data){
    const { referral_code, fullname, sex, dob, email } = data;
    return models.User.update({
        referral_code,
        fullname,
        sex,
        dob,
        email,
        updated_at: Date.now()
    }, {
        where: { id: userId }
    });
}
