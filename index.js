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
    const { nombre, precio, estacionDelPlatillo } = req.body;

    if (!nombre || !precio || !estacionDelPlatillo) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoPlatillo = {
        id: idCounter++,
        nombre,
        precio,
        estacionDelPlatillo
    };

    platillos.push(nuevoPlatillo);
    res.status(201).json(nuevoPlatillo);
});

// GET /platillos - Devuelve todos los platillos
app.get('/platillos', (req, res) => {
    res.json(platillos);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
