export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('http://127.0.0.1:8000/api/auth/login', credentials)
            .then((response) => {
                res(response.data);
            })
            .catch((error) => {
                rej('Wrong email or password');
            })
    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}