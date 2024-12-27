/**
 * @swagger
 * components:
 *   schemas:
 *     SetTokenFCM:
 *       type: object
 *       required:
 *         - fcm_token
 *         - device_id
 *         - os_platform
 *       properties:
 *         fcm_token:
 *           type: string
 *           description: token
 *         device_id:
 *           type: string
 *           description: device_id
 *         device_name:
 *           type: string
 *           description: device_name
 *         os_platform:
 *           type: string
 *           description: platform
 *         user_id:
 *           type: number
 *           description: id of user
 *       example:
 *         fcm_token: "fcm_token"
 *         device_id: "device_id"
 *         device_name: "ip14 promax"
 *         os_platform: "ios"
 *         user_id: 2
 */

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: The tokens managing API
 * 
 * /tokens/set-token-fcm:
 *   post:
 *     summary: set a token fcm
 *     tags: [Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetTokenFCM'
 *     responses:
 *       200:
 *         description: set a token fcm successfully
 *       500:
 *         description: Something went wrong
 */