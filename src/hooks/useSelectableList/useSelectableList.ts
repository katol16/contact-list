import { useCallback, useMemo, useState } from 'react';
import { type Contact } from '../../types';

export const useSelectableList = (list: Contact[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id],
    );
  }, []);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const { selectedContacts, unselectedContacts } = useMemo(() => {
    const selected: Contact[] = [];
    const unselected: Contact[] = [];

    for (const item of list) {
      if (selectedSet.has(item.id)) {
        selected.push(item);
      } else {
        unselected.push(item);
      }
    }

    return { selectedContacts: selected, unselectedContacts: unselected };
  }, [list, selectedSet]);

  return {
    selectedIds,
    selectedContacts,
    unselectedContacts,
    toggle,
  };
};
