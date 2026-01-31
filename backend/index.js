const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/velas', async (req, res) => {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

app.post('/velas', async (req, res) => {
    const { nombre, descripcion, precio, imagen_url, stock } = req.body;
    const { data, error } = await supabase
        .from('productos')
        .insert([{ nombre, descripcion, precio, imagen_url, stock }]);
    
    if (error) return res.status(400).json(error);
    res.status(201).json({ mensaje: "Vela creada con éxito", data });
});

app.put('/velas/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id);

    if (error) return res.status(400).json(error);
    res.json({ mensaje: "Vela actualizada", data });
});

app.delete('/velas/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json(error);
    res.json({ mensaje: "Vela eliminada correctamente" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));