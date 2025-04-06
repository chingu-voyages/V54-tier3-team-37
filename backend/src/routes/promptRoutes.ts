import {Router} from "express";
import {promptController} from "../controllers/index.js";
import {validateBody} from "../middleware/validateBody.js";
import {validatePromptFields, validateSavePromptFields} from "../validation/index.js";
import {authMiddleware} from "../middleware/index.js";


export const promptRoute: Router = Router();

/**
 * @swagger
 * /prompts/generate:
 *   post:
 *     summary: Generate a Gemini prompt
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SavePromptRequest'
 *           example:
 *             role: "QA Tester"
 *             context: "I'm testing a web app and want to ensure full coverage of edge cases."
 *             task: "Generate test case scenarios for user login"
 *             output: "List of test scenarios with expected results"
 *             constraints: "No third-party login tools, test both UI and API"
 *             language: "EN"
 *             score: 0
 *             geminiText: null
 *             geminiSummary: null
 *     responses:
 *       200:
 *         description: Gemini prompt generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role: { type: string }
 *                 context: { type: string }
 *                 task: { type: string }
 *                 output: { type: string }
 *                 constraints: { type: string }
 *                 language: { type: string }
 *                 score: { type: number }
 *                 geminiText: { type: string }
 *                 geminiSummary: { type: string }
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
promptRoute.post("/generate", authMiddleware, validateBody(validatePromptFields), promptController.generatePrompt);

/**
 * @swagger
 * /prompts/save:
 *   post:
 *     summary: Save a previously generated Gemini prompt
 *     description: |
 *       This endpoint stores a prompt that was generated using the Gemini API. It includes both the original input and Gemini's AI-generated content.
 *
 *       Fields such as `score`, `geminiText`, and `geminiSummary` must be present in the request. The server will reject duplicate prompts based on identical user input.
 *
 *       Only authenticated users can save prompts.
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SavePromptRequest'
 *           example:
 *             role: "QA Tester"
 *             context: "I'm testing a web app and want to ensure full coverage of edge cases."
 *             task: "Generate test case scenarios for user login"
 *             output: "List of test scenarios with expected results"
 *             constraints: "No third-party login tools, test both UI and API"
 *             language: "EN"
 *             score: 0
 *             geminiText: "Here is a list of test scenarios..."
 *             geminiSummary: "Scenarios to test login via UI and API"
 *     responses:
 *       200:
 *         description: Prompt saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 userId: { type: string }
 *                 role: { type: string }
 *                 context: { type: string }
 *                 task: { type: string }
 *                 output: { type: string }
 *                 constraints: { type: string }
 *                 language: { type: string }
 *                 score: { type: number }
 *                 geminiText: { type: string }
 *                 geminiSummary: { type: string }
 *       400:
 *         description: Validation error - missing or invalid fields
 *       401:
 *         description: Unauthorized - user not authenticated
 *       409:
 *         description: Duplicate prompt - identical prompt already exists
 *       500:
 *         description: Server error
 */
promptRoute.post("/save", authMiddleware, validateBody(validateSavePromptFields), promptController.savePrompt);

/**
 * @swagger
 * /prompts/{promptId}:
 *   get:
 *     summary: Get a specific prompt by ID
 *     description: Retrieves a single prompt by its unique ID. The user must be authenticated.
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: promptId
 *         in: path
 *         required: true
 *         description: The UUID of the prompt to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: e89ea692-fb5f-4191-81ed-03ed1dbd19d4
 *     responses:
 *       200:
 *         description: Prompt retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 userId: { type: string }
 *                 role: { type: string }
 *                 context: { type: string }
 *                 task: { type: string }
 *                 output: { type: string }
 *                 constraints: { type: string }
 *                 language: { type: string }
 *                 score: { type: number }
 *                 geminiText: { type: string }
 *                 geminiSummary: { type: string }
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Prompt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Prompt not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
promptRoute.get("/:promptId", authMiddleware, promptController.getPrompt);

/**
 * @swagger
 * /prompts:
 *   get:
 *     summary: Get all prompts for the authenticated user
 *     description: Returns a list of all prompts created by the authenticated user.
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of prompts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prompt'
 *             example:
 *               - id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *                 userId: "user-123"
 *                 role: "Developer"
 *                 context: "Build a login feature"
 *                 task: "Write backend logic"
 *                 output: "Express route for authentication"
 *                 constraints: "No third-party auth packages"
 *                 language: "EN"
 *                 score: 5
 *                 geminiText: "This is the full Gemini response."
 *                 geminiSummary: "Short summary of the response"
 *                 createdAt: "2025-04-04T12:00:00Z"
 *               - id: "e89ea692-fb5f-4191-81ed-03ed1dbd19d4"
 *                 userId: "user-123"
 *                 role: "PHP Developer"
 *                 context: "Modern test approaches"
 *                 task: "Find projects using them"
 *                 output: "List of projects with test info"
 *                 constraints: "Avoid archived repos"
 *                 language: "EN"
 *                 score: 0
 *                 geminiText: "Detailed Gemini response here..."
 *                 geminiSummary: "Short summary here..."
 *                 createdAt: "2025-04-05T14:52:20.000Z"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
promptRoute.get("/", authMiddleware, promptController.getAllPrompts);

/**
 * @swagger
 * /prompts/{promptId}:
 *   put:
 *     summary: Update the score of a prompt
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
 *             required:
 *               - score
 *             properties:
 *               score:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Updated prompt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 userId: { type: string }
 *                 role: { type: string }
 *                 context: { type: string }
 *                 task: { type: string }
 *                 output: { type: string }
 *                 constraints: { type: string }
 *                 language: { type: string }
 *                 score: { type: number }
 *                 geminiText: { type: string }
 *                 geminiSummary: { type: string }
 *       400:
 *         description: Missing or invalid score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Prompt not found or not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
promptRoute.put("/:promptId", authMiddleware, promptController.updateScorePrompt);

// /**
//  * @swagger
//  * /prompts:
//  *   delete:
//  *     summary: Delete all prompts for the authenticated user
//  *     description: Removes all prompt records associated with the currently authenticated user.
//  *     tags:
//  *       - Prompts
//  *     security:
//  *       - cookieAuth: []
//  *     responses:
//  *       204:
//  *         description: All prompts successfully deleted (no content returned)
//  *       401:
//  *         description: Unauthorized - user not authenticated
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: Unauthorized
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: Something went wrong
//  */
// promptRoute.delete("/", authMiddleware, promptController.deleteAllPrompts);

/**
 * @swagger
 * /prompts/{promptId}:
 *   delete:
 *     summary: Delete a specific prompt by ID
 *     description: Deletes the prompt identified by `promptId` for the authenticated user and returns the deleted prompt ID as a raw string.
 *     tags:
 *       - Prompts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: promptId
 *         in: path
 *         required: true
 *         description: The UUID of the prompt to delete
 *         schema:
 *           type: string
 *           format: uuid
 *           example: a1b2c3d4-e5f6-7890-abcd-1234567890ef
 *     responses:
 *       200:
 *         description: Prompt deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: uuid
 *               example: a1b2c3d4-e5f6-7890-abcd-1234567890ef
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *                 message:
 *                   type: string
 *                   example: Token not provided
 *       404:
 *         description: Prompt not found or not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Prompt not found or not authorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
promptRoute.delete("/:promptId", authMiddleware, promptController.deletePrompt);


