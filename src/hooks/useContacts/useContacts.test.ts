import { renderHook, waitFor } from '@testing-library/react';
import { useContacts } from './useContacts';
import apiData from '../../api';
import type { Contact } from '../../types';

jest.mock('../../api');
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

describe('useContacts', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fetches contacts successfully', async () => {
    mockedApiData.mockResolvedValueOnce(mockContacts);

    const { result } = renderHook(() => useContacts());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockContacts);
    expect(result.current.error).toBeNull();
  });

  it('handles error correctly', async () => {
    mockedApiData.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useContacts());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
