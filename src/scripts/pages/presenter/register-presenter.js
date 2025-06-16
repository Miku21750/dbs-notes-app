import RegisterView from "../views/register-view";
import { AuthModel } from "../model/auth-model";
import { goto } from "../../utils/transition";

export default class RegisterPresenter {
    async render(){
        return RegisterView.render();
    }
    async afterRender() {
        RegisterView.bindSubmit(async ({ name, email, password, statusMsg}) => {
            try {
                statusMsg.textContent = 'Proses Mendaftar...'
                const result = await AuthModel.register({name, email, password})

                if(result.error) throw new Error(result.message || "Pendaftaran gagal")
                goto("#/login")
            } catch (error) {
                statusMsg.textContent = `Pendaftaran gagal: ${error.message}`;                
            }
        })
    }
}

