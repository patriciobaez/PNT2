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

    validacionUsuario(usernameOrEmail, password) {
        return this.userLoginInformation.find(user =>
            (user.email === usernameOrEmail || user.username === usernameOrEmail) &&
            user.password === password
        );
    }
}

export default UserData;