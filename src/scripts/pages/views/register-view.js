const RegisterView = {
    render() {
        return `
            <section class="container">
                <h1>Daftar</h1>
                    <form id="registerForm">
                    <label for="name">Nama</label><br />
                    <input type="text" id="name" name="name" required /><br />

                    <label for="email">Email</label><br />
                    <input type="email" id="email" name="email" required /><br />

                    <label for="password">Password</label><br />
                    <input type="password" id="password" name="password" required /><br />

                    <button type="submit">Daftar</button>
                    <p id="statusMsg"></p>
                </form>
            </section>
        `
    },

    bindSubmit(handler){
        const form = document.getElementById('registerForm');
        const statusMsg = document.getElementById('statusMsg');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.name.value;
            const email = form.email.value;
            const password = form.password.value;

            await handler({ name, email, password, statusMsg })
        })
    }
}

export default RegisterView;