import {Router} from "express";
import {authMiddleware} from "../middleware/index.js";
import {promptController} from "../controllers/index.js";
import {getPrompt} from "../controllers/promptController.js";


const promptRoute: Router = Router();

/**
 * @swagger
 * tags:
 *   - name: Prompts
 *     description: Prompt management
 */

/**
 * @swagger
 * /prompts:
 *   post:
 *     summary: Create a new prompt
 *     tags: [Prompts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 $ref: '#/components/schemas/PromptInput'
 *     responses:
 *       201:
 *         description: Prompt created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prompt:
 *                   $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
promptRoute.post("/", authMiddleware, promptController.createPrompt);

promptRoute.get("/:promptId", authMiddleware, promptController.getPrompt);

export {promptRoute};
