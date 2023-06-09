import { Router } from 'express'
const router = Router();

/** import all controller */
import * as controller from '../controller/appController.js';
import { registerMail } from '../controller/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

/**POST Method */
router.route('/register').post(controller.register); //register route
router.route('/registerMail').post(registerMail); //send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); //login in app

/**GET Method */
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // veriy generate OTP
router.route('/createResetSession').get(controller.createResetSession); //reset all the variables

/**PUT Method */
router.route('/updateUser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset paassword

export default router;