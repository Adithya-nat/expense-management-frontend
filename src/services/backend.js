import axios from 'axios';
const API_URL = "http://localhost:4001/api/";

class Items {
  static getItemByDate(date) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}itemsByDate`, { params : date }).then((data) => {
        console.log('Items by date successfull');
        console.log(data);
        resolve(data);
      }).catch((error) => {
        console.log('Some error calling get item by date');
        console.log(error);
        reject(error);
      });
    });
  }

  static getItemByMonth(payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}itemsByMonth`, { params : payload }).then((data) => {
        console.log('Items by Month successfull');
        console.log(data);
        resolve(data);
      }).catch((error) => {
        console.log('Some error calling get item by Month');
        console.log(error);
        reject(error);
      });
    });
  }

  static getItemByYear(payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}itemsByYear`, { params : payload }).then((data) => {
        console.log('Items by Year successfull');
        console.log(data);
        resolve(data);
      }).catch((error) => {
        console.log('Some error calling get item by Year');
        console.log(error);
        reject(error);
      });
    });
  }

  static createItem(payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}items`, payload).then((data) => {
        console.log('Successfully created Item');
        console.log(data);
        resolve(data);
      }).catch((error) => {
        console.log('Error creating items');
        console.log(error);
        reject(error);
      });
    });
  }
}

export default Items;