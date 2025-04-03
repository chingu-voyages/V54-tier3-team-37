import '@testing-library/jest-dom';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

// Why doesn't @/components work
import PromptGenResult from '../src/components/PromptGenResult';

describe('PromptGenResult Component', () => {
  it('renders the "Your generated prompts will appear here" message when no prompt is generated', () => {
    render(<PromptGenResult generatedPrompt={null} />);
    const messageElement = screen.getByText(/Your generated prompts will appear here/i);
    expect(messageElement).toBeInTheDocument();
  });

  it('renders the generated prompt when it is provided', () => {
    const promptText = 'This is a test generated prompt.';
    render(<PromptGenResult generatedPrompt={promptText} />);
    const promptElement = screen.getByText(promptText);
    expect(promptElement).toBeInTheDocument();
  });

  it('renders the star ratings when a prompt is present', () => {
    const promptText = 'This is a test generated prompt.';
    render(<PromptGenResult generatedPrompt={promptText} />);
    const starElements = screen.getAllByRole('img', { name: 'Star' });
    expect(starElements.length).toBe(5);
  });

  it('renders the copy and save buttons when a prompt is present', () => {
    const promptText = 'This is a test generated prompt.';
    render(<PromptGenResult generatedPrompt={promptText} />);
    const copyButton = screen.getByRole('button', { name: /Copy/i });
    const saveButton = screen.getByRole('button', { name: /Save/i });
    expect(copyButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
