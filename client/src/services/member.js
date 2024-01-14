import api from "./api";

export default {
  getAll() {
    return api.get("/member/showAll");
  },
  getAllMember(id) {
    return api.get("/member/show/" + id);
  },
  deleteMember(id) {
    return api.delete("/member/delete/" + id);
  },
  updateMember(body) {
    return api.put("/member/update/" + body.id, body);
  },
  addMember(body) {
    return api.post("/member/add", body);
  },
};
