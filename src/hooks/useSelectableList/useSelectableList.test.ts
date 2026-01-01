import { renderHook, act } from '@testing-library/react';
import { useSelectableList } from './useSelectableList';
import type { Contact } from '../../types';

const mockContacts: Contact[] = [
  {
    id: '1',
    firstNameLastName: 'John Doe',
    jobTitle: 'Manager',
    emailAddress: 'john@example.com',
  },
  {
    id: '2',
    firstNameLastName: 'Jane Smith',
    jobTitle: 'Designer',
    emailAddress: 'jane@example.com',
  },
  {
    id: '3',
    firstNameLastName: 'Karol Vogelgezang',
    jobTitle: 'Developer',
    emailAddress: 'karol@example.com',
  },
];

describe('useSelectableList', () => {
  it('initial state is correct', () => {
    const { result } = renderHook(() => useSelectableList(mockContacts));

    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.selectedContacts).toEqual([]);
    expect(result.current.unselectedContacts).toEqual(mockContacts);
  });

  it('selects and unselects items correctly', () => {
    const { result } = renderHook(() => useSelectableList(mockContacts));

    act(() => result.current.toggle('1'));
    expect(result.current.selectedIds).toEqual(['1']);
    expect(result.current.selectedContacts).toEqual([mockContacts[0]]);
    expect(result.current.unselectedContacts).toEqual([mockContacts[1], mockContacts[2]]);

    act(() => result.current.toggle('2'));
    expect(result.current.selectedIds).toEqual(['1', '2']);
    expect(result.current.selectedContacts).toEqual([mockContacts[0], mockContacts[1]]);
    expect(result.current.unselectedContacts).toEqual([mockContacts[2]]);

    act(() => result.current.toggle('1'));
    expect(result.current.selectedIds).toEqual(['2']);
    expect(result.current.selectedContacts).toEqual([mockContacts[1]]);
    expect(result.current.unselectedContacts).toEqual([mockContacts[0], mockContacts[2]]);
  });
});
