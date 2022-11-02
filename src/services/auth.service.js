import axios from "axios";
import qs from "querystring";

const API_URL = process.env.REACT_APP_API_URL + 'api/auth/';
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

class AuthService {
  login(username, password) {
    const loginReq = {
        username: username,
        password: password,
      };
    return axios
      .post(API_URL + "signin", qs.stringify(loginReq), config)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, passwordConfirm) {
    const registerReq = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    return axios.post(API_URL + "signup", qs.stringify(registerReq), config)  
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  isAuthenticated(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken)
      return true;
    else
      return false;
  }
}

export default new AuthService();