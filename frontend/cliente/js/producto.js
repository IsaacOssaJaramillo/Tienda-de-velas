const _supabase = supabase.createClient('TU_URL', 'TU_KEY');
const TELEFONO_DUENA = "573001234567";

async function cargarVelas() {
    const { data: velas, error } = await _supabase.from('productos').select('*');
    if (error) return console.error(error);

    const contenedor = document.getElementById('contenedor-velas');
    velas.forEach(vela => {
        const linkWS = `https://wa.me/${TELEFONO_DUENA}?text=${encodeURIComponent('Hola! Me interesa la vela: ' + vela.nombre)}`;
        contenedor.innerHTML += `
                    <div class="card">
                        <img src="${vela.imagen_url}">
                        <div style="padding: 20px;">
                            <h3>${vela.nombre}</h3>
                            <p class="precio">$${vela.precio.toLocaleString()}</p>
                            <a href="${linkWS}" target="_blank" class="btn-delete" style="background: #25d366; color: white; text-decoration: none; display: block; text-align: center;">Pedir por WhatsApp</a>
                        </div>
                    </div>
                `;
    });
}
cargarVelas();