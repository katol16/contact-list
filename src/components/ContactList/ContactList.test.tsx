import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContactList } from './ContactList';
import type { Contact } from '../../types';

const mockContacts: Contact[] = [
  {
    id: '1',
    firstNameLastName: 'John Doe',
    jobTitle: 'Developer',
    emailAddress: 'john@example.com',
  },
  {
    id: '2',
    firstNameLastName: 'Jane Smith',
    jobTitle: 'Designer',
    emailAddress: 'jane@example.com',
  },
];

const toggleMock = jest.fn();

describe('ContactList', () => {
  it('renders the correct number of contacts', () => {
    const { getByTestId } = render(<ContactList list={mockContacts} toggle={toggleMock} />);

    expect(getByTestId('person-1')).toBeInTheDocument();
    expect(getByTestId('person-2')).toBeInTheDocument();
  });

  it('calls toggle function when a contact is clicked', () => {
    const { getByTestId } = render(<ContactList list={mockContacts} toggle={toggleMock} />);

    fireEvent.click(getByTestId('person-1'));
    expect(toggleMock).toHaveBeenCalledWith('1');

    fireEvent.click(getByTestId('person-2'));
    expect(toggleMock).toHaveBeenCalledWith('2');
  });
});
