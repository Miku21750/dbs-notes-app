import LoginView from "../views/login-view";
import { AuthModel } from "../model/auth-model";
import { isLoggedIn } from "../../utils/auth"
import { goto } from "../../utils/transition"

export default class LoginPresenter { 
    async render() {
        if(isLoggedIn()){
            goto('#/')
            return '';
        }
        return LoginView.render();
    }

    async afterRender(){
        if(isLoggedIn()) return;

        LoginView.bindSubmit(async ({email, password, statusMsg }) => {
            try {
                statusMsg.textContent = 'Process login...'
                const result = await AuthModel.login({email, password})
                if (result.error) throw new Error(result.message || 'Login gagal');

                statusMsg.textContent = 'Login berhasil! Redirecting...';
                goto('#/');
            } catch (error) {
                statusMsg.textContent = `Login gagal: ${error.message}`;
            }
        })
    }
}
