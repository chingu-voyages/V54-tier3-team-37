import '@testing-library/jest-dom';

import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@testing-library/react';

// These jest import resolvers are weirdly not working (@/components/Dashboard can't be found)
import Dashboard from '../src/components/Dashboard';

describe('Dashboard Component', () => {
  it('renders the Prompto link', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );
    const linkElement = screen.getByText(/Prompto/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders the Dashboard header', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );
    const headerElement = screen.getByRole('heading', { name: /Dashboard/i });
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the navigation links', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );
    const generateLink = screen.getByText(/Generate Prompt/i);
    const historyLink = screen.getByText(/History/i);
    expect(generateLink).toBeInTheDocument();
    expect(historyLink).toBeInTheDocument();
  });
});
