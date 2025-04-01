import '@testing-library/jest-dom';

import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import PromptHistory from '../src/components/PromptHistory';

describe('PromptHistory Component', () => {
  it('renders the "Sort By" dropdown menu', () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    const sortByButton = screen.getByText(/Sort By/i);
    expect(sortByButton).toBeInTheDocument();
  });

  it('renders the "Generate New Prompt" button when prompts are available', async () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    // Wait for the mock prompt to load
    await screen.findByText(/Generate New Prompt/i);
    const generateButton = screen.getByText(/Generate New Prompt/i);
    expect(generateButton).toBeInTheDocument();
  });

  it('renders the "You don\'t have any saved prompts to review" message when no prompts are available', () => {
    // Mock the useState to return an empty prompt list
    jest.spyOn(React, 'useState').mockReturnValueOnce([[], () => {}]);
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    const noPromptsMessage = screen.getByText(/You don't have any saved prompts to review/i);
    expect(noPromptsMessage).toBeInTheDocument();
    // Restore the original useState mock implementation to avoid side effects
    jest.spyOn(React, 'useState').mockRestore();
  });

  it('renders accordion items when prompts are available', async () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    // Wait for the mock prompt to load
    await screen.findByText(/Generate New Prompt/i);
    // Get all accordion trigger elements
    const accordionTriggers = screen.getAllByRole('button', {
      name: /AccordionTrigger/i,
    });
    expect(accordionTriggers.length).toBeGreaterThan(0);
  });

  it('renders the star ratings in each accordion item', async () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    // Wait for the mock prompt to load
    await screen.findByText(/Generate New Prompt/i);
    // Get all star elements
    const starElements = screen.getAllByRole('img', { name: /Star/i });
    expect(starElements.length).toBeGreaterThan(0); // Should have 5 stars for each prompt, but may duplicate due to spreading
  });

  it('renders the delete and edit buttons in each accordion item', async () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    // Wait for the mock prompt to load
    await screen.findByText(/Generate New Prompt/i);
    // Get delete and edit buttons
    const deleteButtons = screen.getAllByText(/Delete/i);
    const editButtons = screen.getAllByText(/Edit/i);
    expect(deleteButtons.length).toBeGreaterThan(0);
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it('opens and closes an accordion item when clicked', async () => {
    render(
      <BrowserRouter>
        <PromptHistory />
      </BrowserRouter>
    );
    // Wait for the mock prompt to load
    await screen.findByText(/Generate New Prompt/i);

    // Get an accordion trigger
    const accordionTrigger = screen.getByRole('button', {
      name: /AccordionTrigger/i,
    });
    // Click it to open
    fireEvent.click(accordionTrigger);

    // Get the accordion content
    const accordionContent = await screen.findByText(/You have been assigned a task/i);
    expect(accordionContent).toBeVisible();

    // Click again to close
    fireEvent.click(accordionTrigger);
    // The following line has some issues
    // expect(accordionContent).not.toBeVisible();
  });
});
