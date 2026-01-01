import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PersonInfo } from './PersonInfo';
import type { Contact } from '../../types';

const mockContact: Contact = {
  id: '1',
  firstNameLastName: 'John Doe',
  jobTitle: 'Developer',
  emailAddress: 'john@example.com',
};

describe('PersonInfo', () => {
  it('renders the contact info correctly', () => {
    const { getByText, getByTestId } = render(
      <PersonInfo data={mockContact} onSelect={() => {}} isSelected={false} />,
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
    expect(getByText('JD')).toBeInTheDocument();
    expect(getByTestId('person-1')).toBeInTheDocument();
  });

  it('calls onSelect with correct id when clicked', () => {
    const onSelectMock = jest.fn();
    const { getByTestId } = render(
      <PersonInfo data={mockContact} onSelect={onSelectMock} isSelected={false} />,
    );

    fireEvent.click(getByTestId('person-1'));
    expect(onSelectMock).toHaveBeenCalledWith('1');
  });

  it('adds selectedPerson class when isSelected is true', () => {
    const { getByTestId } = render(
      <PersonInfo data={mockContact} onSelect={() => {}} isSelected={true} />,
    );

    expect(getByTestId('person-1')).toHaveClass('selectedPerson');
  });
});
