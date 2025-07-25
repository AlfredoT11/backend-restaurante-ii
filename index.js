const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let platillos = [
    {
      "id": "1",
      "platilloId": 1,
      "nombre": "Quesadillas de flor",
      "precio": 40,
      "imagen": "http://recetario.lavillita.com.mx/assets/images/recetas/Quesadillas-flor-calabaza-Oaxaca.jpg"
    },
    {
      "id": "2",
      "platilloId": 2,
      "nombre": "Mole poblano",
      "precio": 90,
      "imagen": "https://www.seriouseats.com/thmb/qxfXHOw3gKw_rKMM87aVxTvSCws=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__10__20121024-227412-mole-poblano-8aa343f2cb384508834ed888a4b65df2.jpg"
    },
    {
      "id": "3",
      "platilloId": 3,
      "nombre": "Tamales oaxaqueños",
      "precio": 35,
      "imagen": "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/68D64DAE-9605-42AC-BDCF-328A509EC776/Derivates/7AC0E9FD-F0DA-410B-9D78-19D3C3BEA1F3.jpg"
    }
];

let idCounter = 4;

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
