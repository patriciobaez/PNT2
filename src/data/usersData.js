class UserData {
    constructor() {
        this.userLoginInformation = [];
        this.cargarDatos();
    }

    async getUsersData() {
        const response = await fetch('https://6832510cc3f2222a8cb1ffee.mockapi.io/usuarios/usersAndPass');
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