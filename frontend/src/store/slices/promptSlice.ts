import { postGeminiRequest } from '@/api/prompt';
import type { PromptBody } from '@/types/prompt';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

interface PromptState {
  output: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PromptState = {
  output: null,
  loading: 'idle',
  error: null,
};

export const sendPromptToGemini = createAsyncThunk('prompts/sendPromptToGemini',async (promptBody: PromptBody, {rejectWithValue }) => {
    try {
      const promptBodyWithGeminiResponse = await postGeminiRequest(promptBody);
      return promptBodyWithGeminiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to send prompt to Gemini')
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPromptToGemini.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
        state.output = null;
      })
      .addCase(sendPromptToGemini.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = 'succeeded';
        state.output = action.payload;
      })
      .addCase(sendPromptToGemini.rejected, (state, action) => {
        state.loading = 'failed';
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = null;
        }
      });
  },
});

export const { clearPromptOutput } = promptSlice.actions;
export default promptSlice.reducer;
