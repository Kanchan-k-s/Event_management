<template>
  <h1>hi</h1>
  <button @click="leaveRoom">Leave</button>
</template>

<script>
  //   import {socket} from "@/socket";
  import event from "../services/event";
  import attendEvent from "../services/attendEvent";

  export default {
    data() {
      return {};
    },
    methods: {
      leaveRoom() {
        if (this.$route.query.auth === "member") {
          console.log(this.$route.query.auth);
          let body = {
            eventId: this.$route.query.eventId,
            memberId: this.$route.query.memberId,
            status: "attended",
          };
          attendEvent.unAttendEvent(body).then((res) => {
            console.log(res);
          });
        }
        if (this.$route.query.auth === "org") {
          let item = {
            id: this.$route.query.eventId,
            status: "inactive",
          };
          event
            .updateEvent(item)
            .then((response) => {
              console.log("hi");

              console.log(response);
              //   socket.disconnect();
            })
            .catch((e) => {
              console.log(e);
            });
        }
        // this.$router.push("/");
      },
    },
    created() {
      if (this.$route.query.auth === "org") {
        console.log("socket open");
        // socket.connect();
      }
    },
    unmounted() {
      //   console.log("hello");
      //   socket.disconnect();
    },
  };
</script>
