import api from "./api";

export default {
  getAllCategory() {
    return api.get("/category/show");
  },
  addCategory(body) {
    return api.post("/category/add", body);
  },
  deleteCategory(id) {
    return api.delete("/category/delete/" + id);
  },
  updateCategory(body) {
    return api.put("/category/update/" + body.id, body);
  },
};
