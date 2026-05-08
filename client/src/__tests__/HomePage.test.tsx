import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('should render all four role buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /team member/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adjudicator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /weaver/i })).toBeInTheDocument();
  });

  it('should render the admin link', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it('should display the heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/select your role/i)).toBeInTheDocument();
  });
});
