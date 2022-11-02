import axios from "axios";
const user = JSON.parse(localStorage.getItem('user'));
var Token = '';
if (user && user.accessToken) {
  Token= user.accessToken;
}

const API_URL = process.env.REACT_APP_API_URL + 'api/v1/'
export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": 'Bearer ' + Token
  }
});
