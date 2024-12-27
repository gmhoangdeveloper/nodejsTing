require('dotenv').config();

import {
    updateLogout
} from '../repositories/user.repository';

export async function userLogout(req, res, next){
    const { userId } = req;
    if(userId){
        await updateLogout(userId); 
    }
    return res.status(200).json({
        code: 200,
        message: res.__('Log out successfully'),
    });   
    
}
