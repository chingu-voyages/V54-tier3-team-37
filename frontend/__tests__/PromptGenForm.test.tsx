import '@testing-library/jest-dom';

import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// I have no idea why @/components/ doesn't work
import PromptGenForm from '../src/components/PromptGenForm';

const mockSetGeneratedPrompt = jest.fn();
const mockSetIsLoading = jest.fn();
const mockSetIsGenerated = jest.fn();

const renderForm = () =>
  render(
    <MemoryRouter>
      <PromptGenForm
        setGeneratedPrompt={mockSetGeneratedPrompt}
        setIsLoading={mockSetIsLoading}
        setIsGenerated={mockSetIsGenerated}
        isLoading={false}
        isGenerated={false}
      />
    </MemoryRouter>
  );

describe('PromptGenForm Component', () => {
  beforeEach(() => {
    mockSetGeneratedPrompt.mockClear();
    mockSetIsLoading.mockClear();
    mockSetIsGenerated.mockClear();
  });

  it('renders the form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Context/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Output/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Constraints/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Language/i)).toBeInTheDocument();
  });

  it('updates the textarea fields', async () => {
    renderForm();
    const roleInput = screen.getByLabelText(/Role/i);
    userEvent.type(roleInput, 'Test Role');
    expect(roleInput).toHaveValue('Test Role');
  });

  it('updates the language select field', async () => {
    renderForm();
    const languageSelect = screen.getByRole('button', { name: /Select a language/i });
    fireEvent.click(languageSelect);

    const englishOption = screen.getByText(/English/i);
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(languageSelect).toHaveTextContent('English');
    });
  });

  it('calls setIsLoading and setGeneratedPrompt on submit', async () => {
    renderForm();

    const roleInput = screen.getByLabelText(/Role/i);
    userEvent.type(roleInput, 'Test Role');

    const contextInput = screen.getByLabelText(/Context/i);
    userEvent.type(contextInput, 'Test Context');

    const taskInput = screen.getByLabelText(/Task/i);
    userEvent.type(taskInput, 'Test Task');

    const outputInput = screen.getByLabelText(/Output/i);
    userEvent.type(outputInput, 'Test Output');

    const constraintInput = screen.getByLabelText(/Constraints/i);
    userEvent.type(constraintInput, 'Test Constraints');

    const generateButton = screen.getByRole('button', { name: /Generate/i });
    fireEvent.click(generateButton);

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });
});
