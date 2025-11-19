const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - uuid
 *         - name
 *         - email
 *         - city
 *       properties:
 *         uuid:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email address
 *         city:
 *           type: string
 *           description: The user's city
 */

/**
 * @swagger
 * /api/users/fetch:
 *   post:
 *     summary: Fetch 1000 users from randomuser.me and store in DB
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users fetched and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fetchedCount:
 *                   type: integer
 *                 insertedCount:
 *                   type: integer
 *       500:
 *         description: Server error during fetch
 */
router.post('/fetch', userController.fetchAndStoreUsers);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{uuid}:
 *   put:
 *     summary: Update a user by UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:uuid', userController.updateUser);

module.exports = router;