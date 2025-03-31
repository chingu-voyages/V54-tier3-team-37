// Grid layout with prompto logo cell, dashboard header with user profile, sidebar, main area

import {
  Link,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import PromptGenPage from '@/pages/PromptGenPage';

import Container from './Container';

// Sidebar with Prompt and History w/ icons

// Subroutes for main body area

// Generate Prompt section

// Heading: Create Effective Prompts for AI Systems with Our Intuitive Generator
// Subheading: Fill in the details below to generate a clear, well-structured, and effective prompt tailored to your needs.

// AI Prompt Generator Form Card with tooltips: 2cols
// Role
// Output Language
// Context
// Output
// Task
// Constraints

// Generate/Regenerate button // Local generated state needed

// Generated Prompts Card:
// Placeholder: Your generated prompts will appear here
// Display, rating, save, copy

// History section
// Sort by date created and rating asc/desc
// + Create New Prompt

// Cards list as accordion with first line displayed in title

// Created on line

// Rating line
// Delete and edit

const Dashboard = () => {
  return (
    <section className="from-muted to-background w-full bg-gradient-to-r from-50% to-50%">
      <Container>
        <div className="grid w-full grid-cols-[256px_1fr]">
          <div className="bg-muted p-8">
            <Link
              to="/"
              className="font-keania-one text-3xl lowercase"
            >
              Prompto
            </Link>
          </div>
          <div className="bg-background p-8">
            <h2 className="text-3xl font-bold">Dashboard</h2>
          </div>
          <div className="bg-muted p-8">
            <ul className="space-y-4 text-lg">
              <li className="relative pl-6">
                <Link
                  to="generate"
                  className="before:bg-muted-foreground before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 hover:underline"
                >
                  Generate Prompt
                </Link>
              </li>
              <li className="relative pl-6">
                <Link
                  to="history"
                  className="before:bg-muted-foreground before:absolute before:top-1/2 before:left-0 before:size-4 before:-translate-y-1/2 hover:underline"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-background px-8">
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
