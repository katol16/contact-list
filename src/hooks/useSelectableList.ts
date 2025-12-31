import { useCallback, useMemo, useState } from 'react';
import { type Contact } from '../types';

export const useSelectableList = (list: Contact[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id],
    );
  }, []);

  const selectedContacts = useMemo(
    () => list.filter(({ id }) => selectedIds.includes(id)),
    [list, selectedIds],
  );

  const unselectedContacts = useMemo(
    () => list.filter(({ id }) => !selectedIds.includes(id)),
    [list, selectedIds],
  );

  console.log('selectedContacts', selectedContacts);
  console.log('unselectedContacts', unselectedContacts);

  return {
    selectedIds,
    selectedContacts,
    unselectedContacts,
    toggle,
  };
};
