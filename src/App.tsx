import React from 'react';
import { ContactList, Spinner } from './components';
import { useContacts, useSelectableList } from './hooks';

function App() {
  const { data, loading, error, fetchContacts } = useContacts();
  const { selectedIds, selectedContacts, unselectedContacts, toggle } = useSelectableList(data);

  return (
    <div className="App">
      <main className="container">
        <div className="selected">Selected contacts: {selectedIds.length}</div>
        <ContactList list={selectedContacts} toggle={toggle} isSelected />
        <hr />
        <ContactList list={unselectedContacts} toggle={toggle} />
        {loading && <Spinner />}
        {error && <div className="error">{error}</div>}
        <button
          className="loadMoreBtn"
          onClick={fetchContacts}
          disabled={loading}
          data-testid="loadMoreBtn"
        >
          {error ? 'Try Again' : 'Load more'}
        </button>
      </main>
    </div>
  );
}

export default App;
