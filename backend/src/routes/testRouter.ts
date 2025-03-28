import {Router} from "express";

export const router: Router = Router({});


/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Just a test route
 *     responses:
 *       200:
 *         description: Hello there
 */
router.get('/hello', (req, res) => {
    res.send('hello world');
});