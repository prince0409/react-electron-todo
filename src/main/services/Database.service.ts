import Sqlite, { Database } from 'better-sqlite3';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

export function connect() {
  let db: Database | null = null;
  try {
    db = Sqlite('database.db', {
      verbose: console.log,
      fileMustExist: true,
    });
  } catch (error) {
    console.log('error', error);
  } finally {
    console.log('finally');
  }
  return db;
}

export function insertTODO(todo: TODO) {
  const db = connect();

  const stm = db?.prepare(
    'INSERT INTO todos (title, date, status) VALUES (@title, @date, @status)',
  );

  stm?.run(todo);
}

export function updateTODO(todo: TODO) {
  const db = connect();
  const { title, status, id } = todo;

  const stm = db?.prepare(
    'UPDATE todos SET title = @title, status = @status WHERE id = @id',
  );

  stm?.run({ title, status, id });
}

export function deleteTODO(id: number) {
  const db = connect();

  const stm = db?.prepare('DELETE FROM todos WHERE id = @id');

  stm?.run({ id });
}

export function getAllTODO() {
  const db = connect();
  console.log('================ getall', db);

  const stm = db?.prepare('SELECT * FROM todos');
  console.log('================ getall connected', stm);

  return stm?.all() as TODO[];
}

export function getOneTODO(id: number) {
  const db = connect();

  const stm = db?.prepare('SELECT * FROM todos where id = @id');

  return stm?.get({ id }) as TODO;
}
