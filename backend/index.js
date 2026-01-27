const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- RUTAS PARA POSTMAN ---

// 1. Obtener todas las velas (Público)
app.get('/velas', async (req, res) => {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 2. Crear una vela nueva (Esto lo usará el Admin)
app.post('/velas', async (req, res) => {
    const { nombre, descripcion, precio, imagen_url, stock } = req.body;
    const { data, error } = await supabase
        .from('productos')
        .insert([{ nombre, descripcion, precio, imagen_url, stock }]);
    
    if (error) return res.status(400).json(error);
    res.status(201).json({ mensaje: "Vela creada con éxito", data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));