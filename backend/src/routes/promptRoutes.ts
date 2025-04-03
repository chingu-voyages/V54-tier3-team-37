import {Router} from "express";
import {authMiddleware} from "../middleware/index.js";
import {promptController} from "../controllers/index.js";


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
 * /prompts:
 *   delete:
 *     summary: Delete all prompts for the authenticated user
 *     tags: [Prompts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       204:
 *         description: All prompts deleted successfully
 *       400:
 *         description: Missing userId or promptId
 *       500:
 *         description: Internal server error
 */
promptRoute.delete("/", authMiddleware, promptController.deleteAllPrompts);

/**
 * @swagger
 * /prompts/{promptId}:
 *   delete:
 *     summary: Delete a specific prompt by ID
 *     tags: [Prompts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: promptId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the prompt to delete
 *     responses:
 *       204:
 *         description: Prompt deleted successfully
 *       400:
 *         description: Missing userId or promptId
 *       404:
 *         description: Prompt not found or not authorized
 *       500:
 *         description: Internal server error
 */
promptRoute.delete("/:promptId", authMiddleware, promptController.deletePrompt);


/**
 * @swagger
 * /prompts/{promptId}:
 *   get:
 *     summary: Get a prompt by ID
 *     description: Returns a specific prompt created by the authenticated user.
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: promptId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the prompt to retrieve
 *     responses:
 *       200:
 *         description: Prompt retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prompt:
 *                   $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Missing userId or promptId
 *       404:
 *         description: Prompt not found
 *       500:
 *         description: Internal server error
 */
promptRoute.get("/:promptId", authMiddleware, promptController.getPrompt);

export {promptRoute};
