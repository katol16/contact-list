import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import apiData from './api';
import type { Contact } from './types';

jest.mock('./api');
const mockedApiData = jest.mocked(apiData);

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

describe('App component', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders contacts after successful fetch', async () => {
    mockedApiData.mockResolvedValueOnce(mockContacts);

    render(<App />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    mockContacts.forEach((contact) => {
      expect(screen.getByTestId(`person-${contact.id}`)).toBeInTheDocument();
    });
    expect(mockedApiData).toHaveBeenCalledTimes(1);
  });

  it('shows error message on fetch failure', async () => {
    mockedApiData.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();

    const button = screen.queryByTestId('loadMoreBtn');
    expect(button).toBeEnabled();
    expect(mockedApiData).toHaveBeenCalledTimes(1);
  });

  it('clicking Load more calls fetchContacts', async () => {
    mockedApiData.mockResolvedValueOnce(mockContacts);

    render(<App />);

    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    const button = screen.queryByTestId('loadMoreBtn') as HTMLButtonElement;
    fireEvent.click(button);

    expect(mockedApiData).toHaveBeenCalledTimes(2);
  });

  it('button is disabled while loading', async () => {
    mockedApiData.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockContacts), 100)),
    );

    render(<App />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await waitFor(() => expect(button).toBeEnabled());
  });
});
