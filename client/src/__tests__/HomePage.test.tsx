import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SocketProvider } from '../contexts/SocketContext';
import { GameProvider } from '../contexts/GameContext';
import HomePage from '../pages/HomePage';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <SocketProvider>
        <GameProvider>{children}</GameProvider>
      </SocketProvider>
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('should render all four role buttons', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /team member/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adjudicator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /timer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /weaver/i })).toBeInTheDocument();
  });

  it('should render the admin link', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it('should display the heading', () => {
    render(<HomePage />, { wrapper: Wrapper });
    expect(screen.getByText(/select your role/i)).toBeInTheDocument();
  });
});
