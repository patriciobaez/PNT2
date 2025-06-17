class UserData {
    constructor() {
        this.userLoginInformation = [];
        this.cargarDatos();
    }

    async getUsersData() {
        const response = await fetch('https://68506351e7c42cfd17988666.mockapi.io/grapis/users');
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