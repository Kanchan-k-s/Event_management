import api from "./api";

export default {
  getAllEventByOrganizer(id) {
    return api.get("/event/organizer/" + id);
  },
  deleteEvent(id) {
    return api.delete("/event/delete/" + id);
  },
  updateEvent(body) {
    return api.put("/event/update/" + body.id, body);
  },
  addEvent(body) {
    return api.post("/event/add", body);
  },
};
