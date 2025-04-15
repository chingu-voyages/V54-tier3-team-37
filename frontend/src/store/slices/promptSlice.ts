import {
  postGeminiRequest,
  savePrompt,
  fetchPrompts,
  deletePrompt as deletePromptApi,
  updatePromptScoreApi,
} from '@/api/prompt';
import type { PromptBody, PromptResponse } from '@/types/prompt';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PromptState {
  output: PromptResponse | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  promptHistory: PromptResponse[];
}

const initialState: PromptState = {
  output: null,
  loading: 'idle',
  error: null,
  promptHistory: [],
};

export const sendPromptToGemini = createAsyncThunk(
  'prompts/sendPromptToGemini',
  async (promptBody: PromptBody, { rejectWithValue }) => {
    try {
      const promptBodyWithGeminiResponse = await postGeminiRequest(promptBody);
      return promptBodyWithGeminiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to send prompt to Gemini');
    }
  }
);

export const savePromptToDatabase = createAsyncThunk(
  'prompts/savePrompt',
  async (
    promptBody: PromptBody & { geminiText: string; geminiSummary: string },
    { rejectWithValue }
  ) => {
    try {
      const savedPrompt = await savePrompt(promptBody);
      return savedPrompt;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to save prompt to database');
    }
  }
);

export const getPromptHistory = createAsyncThunk(
  'prompts/getPromptHistory',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPrompts();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to load prompt history');
    }
  }
);

export const deletePrompt = createAsyncThunk(
  'prompts/deletePrompt',
  async (promptId: string, { rejectWithValue }) => {
    try {
      await deletePromptApi(promptId);
      return promptId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete prompt');
    }
  }
);

export const updatePromptScoreOnServer = createAsyncThunk(
  'prompts/updatePromptScoreOnServer',
  async ({ promptId, score }: { promptId: string; score: number }, { rejectWithValue }) => {
    try {
      await updatePromptScoreApi(promptId, score);
      return { promptId, score };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update score');
    }
  }
);

export const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    clearPromptOutput: (state) => {
      state.output = null;
      state.error = null;
      state.loading = 'idle';
    },
    updatePromptScore: (state, action: PayloadAction<number>) => {
      if (state.output) {
        state.output.score = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPromptToGemini.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
        state.output = null;
      })
      .addCase(sendPromptToGemini.fulfilled, (state, action: PayloadAction<PromptResponse>) => {
        state.loading = 'succeeded';
        state.output = action.payload;
      })
      .addCase(sendPromptToGemini.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || null;
      })

      .addCase(savePromptToDatabase.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(savePromptToDatabase.fulfilled, (state, action: PayloadAction<PromptResponse>) => {
        state.loading = 'succeeded';
        state.output = action.payload;
      })
      .addCase(savePromptToDatabase.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || null;
      })

      .addCase(getPromptHistory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getPromptHistory.fulfilled, (state, action: PayloadAction<PromptResponse[]>) => {
        state.loading = 'succeeded';
        state.promptHistory = action.payload;
      })
      .addCase(getPromptHistory.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || null;
      })

      .addCase(deletePrompt.fulfilled, (state, action: PayloadAction<string>) => {
        state.promptHistory = state.promptHistory.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePrompt.rejected, (state, action) => {
        state.error = (action.payload as string) || null;
      })

      .addCase(updatePromptScoreOnServer.fulfilled, (state, action) => {
        if (state.output && state.output.id === action.payload.promptId) {
          state.output.score = action.payload.score;
        }
      })
      .addCase(updatePromptScoreOnServer.rejected, (state, action) => {
        state.error = (action.payload as string) || null;
      });
  },
});

export const { clearPromptOutput, updatePromptScore } = promptSlice.actions;
export default promptSlice.reducer;
