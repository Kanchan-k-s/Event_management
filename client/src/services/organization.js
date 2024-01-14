import api from "./api";

export default {
  addOrganizer(body) {
    return api.post("/organizer/add", body);
  },
  getAllOrganizer() {
    return api.get("/organizer/show");
  },
  getOrganizer(id) {
    return api.get("/organizer/show/" + id);
  },
  deleteOrganizer(id) {
    return api.delete("/organizer/delete/" + id);
  },
  updateOrganizer(item) {
    return api.put("/organizer/update/" + item.id, item);
  },
};
