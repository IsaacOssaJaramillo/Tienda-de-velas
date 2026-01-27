// Configuración de Supabase
const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'sb_publishable_LFzpTNq551UgF7Niftmoog_wWoC7iBS'; // Nota: Asegúrate de usar tu Service Role Key si tienes problemas de permisos
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- 1. FUNCIÓN PARA VISTA PREVIA DE IMAGEN ---
// Esta función permite ver la imagen en pantalla apenas se selecciona
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('foto-archivo');
    
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Buscamos o creamos un contenedor de preview
                let preview = document.getElementById('img-preview-upload');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'img-preview-upload';
                    preview.style.width = '100px';
                    preview.style.height = '100px';
                    preview.style.marginTop = '10px';
                    preview.style.borderRadius = '8px';
                    preview.style.objectFit = 'cover';
                    preview.style.border = '2px solid #e63946';
                    fileInput.parentElement.appendChild(preview);
                }
                preview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

// --- 2. FUNCIÓN PRINCIPAL: SUBIR VELA ---
async function subirVela() {
    // Referencias a elementos
    const btn = document.querySelector('.btn-publish');
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const fotoFile = document.getElementById('foto-archivo').files[0];

    // Validaciones básicas
    if (!nombre || !precio || !fotoFile) {
        alert("⚠️ Por favor, rellena los campos obligatorios y selecciona una imagen.");
        return;
    }

    // Bloquear botón para evitar múltiples envíos
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Procesando...`;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";

    try {
        // Generar un nombre único para la imagen (Evita conflictos)
        const extension = fotoFile.name.split('.').pop();
        const nombreLimpio = `${Date.now()}_vela.${extension}`;

        // A. Subir imagen al Storage de Supabase
        const { data: uploadData, error: uploadError } = await _supabase.storage
            .from('imagens-velas')
            .upload(nombreLimpio, fotoFile, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) throw new Error("Error en Storage: " + uploadError.message);

        // B. Obtener la URL pública de la imagen subida
        const { data: urlData } = _supabase.storage
            .from('imagens-velas')
            .getPublicUrl(nombreLimpio);

        const publicUrl = urlData.publicUrl;

        // C. Insertar los datos en la tabla 'productos'
        const { error: dbError } = await _supabase
            .from('productos')
            .insert([{
                nombre: nombre,
                precio: parseFloat(precio),
                descripcion: descripcion,
                imagen_url: publicUrl,
                created_at: new Date()
            }]);

        if (dbError) throw new Error("Error en Base de Datos: " + dbError.message);

        // ÉXITO
        alert("¡Vela publicada con éxito! 🕯️");
        location.reload(); // Recarga la página para limpiar todo

    } catch (error) {
        console.error("Detalle del error:", error);
        alert("❌ " + error.message);
        
        // Restaurar botón en caso de error
        btn.disabled = false;
        btn.innerHTML = "Publicar Vela";
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}