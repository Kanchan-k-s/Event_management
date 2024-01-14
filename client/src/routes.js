import LandingPage from "./views/LandingPage.vue";
import HomePage from "./views/HomePage.vue";
import SuperAdminPage from "./views/SuperAdminPage.vue";
import OrganizerPage from "./views/OrganizerPage.vue";
import AttendEventPage from "./views/AttendEventPage.vue";
import RoomPage from "./views/RoomPage.vue";

export default [
  {
    path: "/",
    component: HomePage,
    name: "HomePage",
  },
  {
    path: "/superadmin",
    component: SuperAdminPage,
    name: "SuperAdminPage",
  },
  {
    path: "/organizer/:id",
    component: OrganizerPage,
    name: "OrganizerPage",
  },
  {
    path: "/attend/:id",
    component: AttendEventPage,
    name: "AttendEventPage",
  },
  {
    path: "/land",
    component: LandingPage,
    name: "LandingPage",
  },
  {
    path: "/host/:org",
    query: ["auth", "memberId", "eventId"],
    component: RoomPage,
    name: "Room Page",
  },
];
