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

/**
 * @swagger
 * /prompts/{promptId}:
 *   put:
 *     summary: Update a prompt and generate a new AI output version
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: promptId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prompt to update
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
 *       200:
 *         description: Prompt updated and output version saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   $ref: '#/components/schemas/PromptOutput'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized – token missing or invalid
 *       404:
 *         description: Prompt not found or not authorized
 *       500:
 *         description: Internal server error
 */
promptRoute.put("/:promptId", authMiddleware, promptController.updatePrompt);


export {promptRoute};
