import axios from "axios";
const user = JSON.parse(localStorage.getItem('user'));
var Token = '';
if (user && user.accessToken) {
  Token= user.accessToken;
}

export default axios.create({
  baseURL: "https://nischintopur-service.herokuapp.com/api/v1",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": 'Bearer ' + Token
  }
});
