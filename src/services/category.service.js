import http from "../http-common";

class CatagoryDataService {
  getAll() {
    return http.get("/categories");
  }

  get(id) {
    return http.get(`/categories/${id}`);
  }

  create(data) {
    console.log("Save service a dhukse");
    return http.post("/category/add", data);
  }

  update(id, data) {
    return http.put(`/categories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categories/${id}`);
  }

  deleteAll() {
    return http.delete(`/categories`);
  }

  findByTitle(title) {
    return http.get(`/categories?title=${title}`);
  }
}

export default new CatagoryDataService();
