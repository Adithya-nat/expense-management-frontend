import axios from "axios";
const API_URL = "http://localhost:4001/api/users";

class AuthService {
  static signup(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL, {
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname
        })
        .then(res => {
          console.log("User created successfully");
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          console.log("User creation");
          reject(err);
        });
    });
  }

  static login(user) {
    return new Promise((resolve, reject) => {
      axios.get(API_URL).then( res => {
          console.log(res);
          for(var u in res.data) {
            console.log(u);
            if(res.data[u].email === user.email && res.data[u].password === user.password) {
              console.log('User found');
              resolve(res.data[u].id);
              return;
            }
          }
          reject({
            message: "User not found"
          });
        })
        .catch(err => {
          console.log('Error fetching list ');
          reject(err);
        });
    })
  }

}

export default AuthService;
