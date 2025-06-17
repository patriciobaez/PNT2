import { MOCKAPI_BASE_URL } from './mockapi';

class UserData {
    constructor() {
        this.userLoginInformation = [];
        this.cargarDatos();
    }

    async getUsersData() {
        const response = await fetch(MOCKAPI_BASE_URL);
        const data = await response.json();
        return data;
    }

    async cargarDatos() {
        this.userLoginInformation = await this.getUsersData();
    }

    validacionUsuario(email, password) {
        return this.userLoginInformation.find(user =>
            user.email === email && user.password === password
        );
    }
}

export default UserData;