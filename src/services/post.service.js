import http from "../http-common";
import qs from "querystring";

class PostDataService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get(`/post/${id}`);
  }

  create(data) {
    return http.post("/post/add", qs.stringify(data));
  }

  update(data) {
    return http.put(`/post/update`, qs.stringify(data));
  }

  delete(id) {
    return http.delete(`/post/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  findByTitle(title) {
    return http.get(`/post?title=${title}`);
  }

}

export default new PostDataService();
