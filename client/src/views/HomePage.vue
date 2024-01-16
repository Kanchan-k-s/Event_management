<template>
  <div class="container w-50">
    <h1 class="text-center">Event Management</h1>
    <div class="input-group mb-3">
      <RouterLink class="btn btn-primary ms-50" to="/superadmin"
        >SuperAdmin</RouterLink
      >
    </div>

    <v-select
      label="Select Organizer"
      :items="organizers"
      item-title="name"
      item-value="id"
      v-model="value"
    ></v-select>

    <div class="input-group mb-3">
      <button
        class="btn btn-primary h-20"
        @click="goToOrganizer"
        :disabled="value.length === 0"
      >
        Go to Organizer
      </button>
    </div>
    <v-select
      label="Select Member"
      :items="members"
      item-title="name"
      item-value="id"
      v-model="mem"
    ></v-select>
    <!-- <button>{{ value }}</button> -->
    <button
      class="btn btn-primary"
      @click="goToMember"
      :disabled="mem.length === 0"
    >
      Attend Event</button
    ><br />
    <!-- <RouterLink to="/attend">Attend</RouterLink><br /> -->
  </div>
</template>

<script>
  import Organizer from "../services/organization";
  import Member from "../services/member";
  export default {
    data() {
      return {
        organizers: [],
        value: "",
        members: [],
        mem: "",
      };
    },
    methods: {
      itemProps(item) {
        return {
          title: item.name,
          subtitle: item.url,
        };
      },
      getAllOrganizer() {
        Organizer.getAllOrganizer().then((res) => {
          if (res.data.success) {
            console.log(res.data.result);
            this.organizers = res.data.result;
          }
        });
      },
      getAllMember() {
        Member.getAll().then((res) => {
          if (res.data.success) {
            console.log(res.data.result);
            this.members = res.data.result;
          }
        });
      },
      goToOrganizer() {
        this.$router.push("/organizer/" + this.value);
      },
      goToMember() {
        this.$router.push("/attend/" + this.mem);
      },
    },
    created() {
      this.getAllMember();
      this.getAllOrganizer();
    },
  };
</script>
