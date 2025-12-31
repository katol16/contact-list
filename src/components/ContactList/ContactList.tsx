import React from 'react';
import { PersonInfo } from '..';
import { type Contact } from '../../types';
import './ContactList.css';

interface ContactListProps {
  list: Contact[];
  toggle: (id: string) => void;
  isSelected?: boolean;
}

export const ContactList = ({ list, toggle, isSelected = false }: ContactListProps) => {
  console.log(
    '📦 ContactList render',
    isSelected ? '(selected)' : '(unselected)',
    'items:',
    list.length,
  );

  return (
    <div className="list">
      {list.map((personInfo: Contact) => (
        <PersonInfo
          key={personInfo.id}
          data={personInfo}
          onSelect={toggle}
          isSelected={isSelected}
        />
      ))}
    </div>
  );
};
