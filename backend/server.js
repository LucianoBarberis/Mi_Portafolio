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

app.post('/proyectos/subir', (req, res)=>{
    const { img, title, text, link } = req.body
    if(!img || !title || !text || !link) {
        return res.status(400).json({ error: "Todos los campos son obligatorios"})
    }
    const sql = 'INSERT INTO proyectos (img, title, text, link) VALUES (?, ?, ?, ?)'
    db.run(sql, [img, title, text, link], function (err) {
        if(err) {
            return res.status(500).json({ error: 'Error al guardar el mensaje' })
        }
        res.json({ message: 'Mensaje enviado con exito' })
    })
})

app.get('/mensajes', (req, res) => {
    const sql = 'SELECT * FROM mensajes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los mensajes' });
        }
        res.json(rows);
    });
});

app.get('/proyectos', (req, res) => {
    const sql = 'SELECT * FROM proyectos';
    db.all(sql, [], (err, rows)=>{
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los proyectos' })
        }
        res.json(rows)
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
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

app.delete('/proyectos/borrar/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM proyectos WHERE id = ?"

    db.run(sql, [id], function (err) {
        if(err) {
            return res.status(500).json({ error: 'Error al intentar borrar el proyecto' })
        }
        res.json({ message: 'Proyecto eliminado con éxito' })
    })
})
