import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NameForm from '../components/NameForm';

describe('NameForm', () => {
  it('should render the text field and button', () => {
    render(<NameForm onSubmit={() => {}} />);
    expect(screen.getByLabelText(/first name and last initial/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add name/i })).toBeInTheDocument();
  });

  it('should disable button when input is less than 2 characters', () => {
    render(<NameForm onSubmit={() => {}} />);
    const button = screen.getByRole('button', { name: /add name/i });
    expect(button).toBeDisabled();

    const input = screen.getByLabelText(/first name and last initial/i);
    fireEvent.change(input, { target: { value: 'A' } });
    expect(button).toBeDisabled();
  });

  it('should enable button when input has 2+ characters', () => {
    render(<NameForm onSubmit={() => {}} />);
    const input = screen.getByLabelText(/first name and last initial/i);
    fireEvent.change(input, { target: { value: 'Al' } });
    expect(screen.getByRole('button', { name: /add name/i })).toBeEnabled();
  });

  it('should call onSubmit with trimmed name', () => {
    const mockSubmit = vi.fn();
    render(<NameForm onSubmit={mockSubmit} />);
    const input = screen.getByLabelText(/first name and last initial/i);
    fireEvent.change(input, { target: { value: '  Alice B  ' } });
    fireEvent.click(screen.getByRole('button', { name: /add name/i }));
    expect(mockSubmit).toHaveBeenCalledWith('Alice B');
  });
});
