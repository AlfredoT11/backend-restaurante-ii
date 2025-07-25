const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let platillos = [];
let idCounter = 1;

// POST /platillos - Agrega un nuevo platillo
app.post('/platillos', (req, res) => {
    const { nombre, precio, estacionDelPlatillo, imagen } = req.body;

    if (!nombre || !precio || !estacionDelPlatillo || !imagen) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoPlatillo = {
        id: idCounter++,
        nombre,
        precio,
        estacionDelPlatillo,
        imagen
    };

    platillos.push(nuevoPlatillo);
    res.status(201).json(nuevoPlatillo);
});

// GET /platillos - Devuelve todos los platillos
app.get('/platillos', (req, res) => {
    res.json(platillos);
});

// DELETE /platillos/:id - Elimina un platillo por ID
app.delete('/platillos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = platillos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Platillo no encontrado' });
    }

    platillos.splice(index, 1);
    res.status(204).send(); // Sin contenido
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
