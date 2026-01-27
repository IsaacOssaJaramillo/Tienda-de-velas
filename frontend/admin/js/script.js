const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'sb_publishable_LFzpTNq551UgF7Niftmoog_wWoC7iBS';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("¡Bienvenida!");
            window.location.href = 'admin.html'; // La manda al panel
        }
    });
}