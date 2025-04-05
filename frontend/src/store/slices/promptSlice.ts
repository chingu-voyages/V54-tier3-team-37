/* ---------------------------------------------------- */
/* Luis, I still have zero idea what I am doing, hahaha */
/* ---------------------------------------------------- */

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// Temporarily left here and might be modified later
interface PromptData {
  role: string;
  context: string;
  task: string;
  output: string;
  constraints: string;
  language: string;
}

interface ApiResponse {
  userId?: string;
  promptId: string;
  content: string;
  metadata: {
    language: string;
    model: string;
    formattedPromptPreview: string;
  };
}

interface ApiErrorResponse {
  error: string;
}

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('Error: VITE_API_BASE_URL is not defined in the environment variables.');
}

export const createPrompt = createAsyncThunk<
  string,
  PromptData,
  { rejectValue: string }
>('prompts/createPrompt', async (promptData: PromptData, { rejectWithValue }) => {
  if (!API_BASE_URL) {
    return rejectWithValue('Base URL is not configured.');
  }
  try {
    const response = await fetch(`${API_BASE_URL}/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptData }),
    });

    if (!response.ok) {
      let errorMsg = `HTTP error! Status: ${response.status}`;
      try {
        const errorData: ApiErrorResponse = await response.json();
        errorMsg = errorData.error || errorMsg;
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      return rejectWithValue(errorMsg);
    }

    const data: ApiResponse = await response.json();

    if (typeof data.content !== 'string') {
      console.error("API response did not contain a valid 'content' string:", data);
      return rejectWithValue('Invalid response format from server.');
    }

  } catch (error: unknown) {
    console.error('Network or other error in createPrompt:', error);
    return rejectWithValue(error.message || 'Network request failed');
  }
});

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
      .addCase(createPrompt.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
        state.output = null;
      })
      .addCase(createPrompt.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = 'succeeded';
        state.output = action.payload;
      })
      .addCase(createPrompt.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'An unknown error occurred';
      });
  },
});

export const { clearPromptOutput } = promptSlice.actions;
export default promptSlice.reducer;
