import api from "./api";

export default {
  addEvent(body) {
    return api.post("/event/add", body);
  },
  getAllEvents() {
    return api.get("/event/show");
  },
  updateEventRel(body) {
    return api.post(
      "/relation/update/" + body.eventId + "/" + body.memberId,
      body
    );
  },
  attendEvent(body) {
    return api.post("/relation/add", body);
  },
  getAllAttendingEvents(id) {
    return api.get("/relation/member/" + id);
  },
  unAttendEvent(body) {
    return api.post("/relation/cancel", body);
  },
  //   deleteOrganizer(id) {
  //     return api.delete("/organizer/delete/" + id);
  //   },
  //   updateOrganizer(item) {
  //     return api.put("/organizer/update/" + item.id, item);
  //   },
};
