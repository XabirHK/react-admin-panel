import http from "../http-common";
import qs from "querystring";


class CatagoryDataService {
  getAll() {
    return http.get("/categories");
  }

  get(id) {
    return http.get(`/category/${id}`);
  }

  create(data) {
    return http.post("/category/add", qs.stringify(data));
  }

  update(data) {
    console.log('update a dhukse ' + data);
    return http.put("/category/update", qs.stringify(data));
  }

  delete(id) {
    return http.delete(`/category/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/categories`);
  }

  findByTitle(title) {
    return http.get(`/categories?title=${title}`);
  }
}

export default new CatagoryDataService();
