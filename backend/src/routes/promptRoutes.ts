import {Router} from "express";
import {authMiddleware} from "../middleware/index.js";
import {promptController} from "../controllers/index.js";


const promptRoute: Router = Router();

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
 *                 type: object
 *                 required:
 *                   - role
 *                   - context
 *                   - task
 *                   - output
 *                   - constraints
 *                   - language
 *                 properties:
 *                   role:
 *                     type: string
 *                     example: Developer
 *                   context:
 *                     type: string
 *                     example: Building a full-stack app
 *                   task:
 *                     type: string
 *                     example: Generate unit tests
 *                   output:
 *                     type: string
 *                     example: List of Jest test cases
 *                   constraints:
 *                     type: string
 *                     example: Use only TypeScript
 *                   language:
 *                     type: string
 *                     enum: [EN, ES, FR]
 *                     example: EN
 *     responses:
 *       201:
 *         description: Prompt created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
promptRoute.post("/", authMiddleware, promptController.createPrompt);

export {promptRoute};
