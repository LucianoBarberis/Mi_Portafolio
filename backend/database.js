const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos (se crea si no existe)
const db = new sqlite3.Database('./contactos.db', (err) => {
    if (err) console.error('Error al conectar con la base de datos', err);
});

// Crear la tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        mensaje TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS proyectos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        img TEXT NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        link TEXT NOT NULL
        )`)
});

module.exports = db;