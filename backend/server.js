const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/contacto', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)';
    db.run(sql, [nombre, email, mensaje], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el mensaje' });
        }
        res.json({ message: 'Mensaje enviado con éxito' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/mensajes', (req, res) => {
    const sql = 'SELECT * FROM mensajes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los mensajes' });
        }
        res.json(rows);
    });
});

app.delete('/mensajes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mensajes WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el mensaje' });
        }
        res.json({ message: 'Mensaje eliminado con éxito' });
    });
});