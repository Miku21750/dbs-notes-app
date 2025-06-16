const LoginView = {
    render() {
        return`
        <section class="container">
            <h1>Masuk</h1>
            <form id="loginForm">
                <label for="email">Email</label><br />
                <input type="email" id="email" name="email" required /><br />

                <label for="password">Password</label><br />
                <input type="password" id="password" name="password" required /><br />

                <button type="submit">Login</button>
                <p id="statusMsg"></p>
            </form>
        </section>
        `
    },
    bindSubmit(handler) {
        const form = document.getElementById('loginForm');
        const statusMsg = document.getElementById('statusMsg');

        form.addEventListener('submit', async(e) =>{
            e.preventDefault();
            const email = form.email.value;
            const password = form.password.value;
            await handler({email, password, statusMsg})
        })
    }
}

export default LoginView;