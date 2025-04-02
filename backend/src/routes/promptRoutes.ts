import {Router} from "express";
import {promptController} from "../controllers/index.js";
import {authMiddleware} from "../middleware/index.js";


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
 *     summary: Create a new prompt and get AI-generated output
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
 *         description: AI-generated output saved and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   $ref: '#/components/schemas/PromptOutput'
 *       400:
 *         description: Invalid request or prompt creation failure
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
promptRoute.post("/", authMiddleware, promptController.createPrompt);

promptRoute.delete("/", authMiddleware, promptController.deleteAllPrompts);

promptRoute.delete("/:promptId", authMiddleware, promptController.deletePrompt);



export {promptRoute};
