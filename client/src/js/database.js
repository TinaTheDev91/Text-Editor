import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  const result = await request;

  console.log('🚀 - data saved to the database', result);
  // console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(id);

  const result = await request;
  console.log('result.value', result);
  return result.value;
};

// console.error('getDb not implemented');

initdb();
