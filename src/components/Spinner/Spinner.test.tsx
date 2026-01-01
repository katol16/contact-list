import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders the spinner element', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('spinner');
  });
});
