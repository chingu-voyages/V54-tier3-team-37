import '@testing-library/jest-dom';

import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import {
  act,
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
    await userEvent.type(roleInput, 'Test Role');

    await waitFor(() => {
      expect(roleInput).toHaveValue('Test Role');
    });
  });

  it('updates the language select field', async () => {
    renderForm();
    const languageSelect = screen.getByRole('combobox', { name: /Language/i });
    fireEvent.click(languageSelect);

    const englishOption = screen.getByRole('option', { name: 'English' });
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(languageSelect).toHaveTextContent('English');
    });
  });

  it('calls setIsLoading on submit', async () => {
    renderForm();

    const roleInput = screen.getByLabelText(/Role/i);
    await userEvent.type(roleInput, 'Test Role');

    const contextInput = screen.getByLabelText(/Context/i);
    await userEvent.type(contextInput, 'Test Context');

    const taskInput = screen.getByLabelText(/Task/i);
    await userEvent.type(taskInput, 'Test Task');

    const outputInput = screen.getByLabelText(/Output/i);
    await userEvent.type(outputInput, 'Test Output');

    const constraintInput = screen.getByLabelText(/Constraints/i);
    await userEvent.type(constraintInput, 'Test Constraints');

    const generateButton = screen.getByRole('button', { name: /Generate/i });

    await act(async () => {
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      });
    });
  });
});
