import {Router} from "express";
import {authMiddleware} from "../middleware/index.js";
import {promptController} from "../controllers/index.js";


const promptRoute: Router = Router();


/**
 * @swagger
 * /prompts/generate:
 *   post:
 *     summary: Generate Gemini response from prompt input
 *     description: Takes a prompt, sends it to Gemini AI, and returns the full response with a summary. Does not store in database.
 *     tags:
 *       - Prompts
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
 *       200:
 *         description: Gemini response generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                 context:
 *                   type: string
 *                 task:
 *                   type: string
 *                 output:
 *                   type: string
 *                 constraints:
 *                   type: string
 *                 language:
 *                   type: string
 *                   enum: [EN, ES, FR]
 *                 geminiText:
 *                   type: string
 *                   example: This is Gemini's full output...
 *                 geminiSummary:
 *                   type: string
 *                   example: Summary of Gemini output
 *       400:
 *         description: Prompt input is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Prompt is required
 *       500:
 *         description: Gemini API failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
promptRoute.post("/generate", authMiddleware, promptController.createPrompt);

/**
 * @swagger
 * /prompts/save:
 *   post:
 *     summary: Save a prompt with AI-generated response
 *     tags:
 *       - Prompts
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
 *                 $ref: '#/components/schemas/Prompt'
 *     responses:
 *       201:
 *         description: Prompt successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Missing or invalid prompt data
 *       401:
 *         description: Unauthorized - user not authenticated
 *       500:
 *         description: Server error
 */
promptRoute.post("/save", authMiddleware, promptController.savePrompt);

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
