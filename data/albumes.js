import { DatabaseSync } from 'node:sqlite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(join(__dirname, 'discostore.db'));

export function getAll() {
  const stmt = db.prepare('SELECT slug, titulo, artista, genero, anio FROM albumes ORDER BY anio');
  return stmt.all();
}

export function getAllFull() {
  const stmt = db.prepare('SELECT * FROM albumes ORDER BY anio');
  return stmt.all();
}

export function getBySlug(slug) {
  const stmt = db.prepare('SELECT * FROM albumes WHERE slug = ?');
  return stmt.get(slug);
}

export function getByGenero(genero) {
  const stmt = db.prepare('SELECT slug FROM albumes WHERE genero = ? COLLATE NOCASE ORDER BY anio');
  return stmt.all(genero);
}

export function search(text) {
  const param = `%${text}%`;
  const stmt = db.prepare(
    'SELECT slug FROM albumes WHERE titulo LIKE ? OR artista LIKE ? OR genero LIKE ? OR sello LIKE ? OR resumen LIKE ? OR descripcion LIKE ?'
  );
  return stmt.all(param, param, param, param, param, param);
}
