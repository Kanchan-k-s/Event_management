<template>
  <h1 class="text-center">Hi superAdmin</h1>
  <div class="container w-25">
    <div class="input-group mb-3">
      <span class="input-group-text">Name:</span>
      <input
        type="text"
        class="form-control"
        v-model="organizer.name"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">URL: </span>
      <input
        type="text"
        class="form-control"
        v-model="organizer.url"
        placeholder="URL"
        aria-label="URL"
        aria-describedby="basic-addon2"
      />
    </div>
    <div class="input-group mb-3">
      <button class="btn btn-primary" @click="add" v-if="!isUpdate">
        Add Organizer
      </button>
      <button class="btn btn-primary" @click="update" v-if="isUpdate">
        Edit Organizer
      </button>
      <button
        class="btn btn-danger"
        @click="cancelUpdate(organizer)"
        v-if="isUpdate"
      >
        Cancel
      </button>
    </div>
  </div>

  <!-- <h1>{{ organizers }}</h1> -->
  <div class="container w-75 p-3">
    <v-table
      theme="dark"
      fixed-header
      width="200px"
      height="300px"
      density="compact"
    >
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">URL</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in organizers" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.url }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteOrganizer(item.id)">
              Delete
            </button>
            <button
              class="btn btn-warning"
              @click="updateOrganizer(item, index)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
  import Organizer from "../services/organization";
  import {useVuelidate} from "@vuelidate/core";
  import {required, url} from "@vuelidate/validators";

  export default {
    setup() {
      // return { v$: useVuelidate() };
    },
    data() {
      return {
        v$: useVuelidate(),
        organizer: {
          name: "",
          url: "",
        },
        organizers: [],
        isUpdate: false,
        updateIndex: "",
      };
    },
    validations() {
      return {
        organizer: {
          name: {required, minLength: 5},
          url: {required, url},
        }, // Matches this.firstName
      };
    },
    methods: {
      add() {
        // console.log(this.v$);
        Organizer.addOrganizer(this.organizer)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$toast.success("Organizer Added");
              this.getAllOrganizer();
            } else {
              this.$toast.warning(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      update() {
        Organizer.updateOrganizer(this.organizer)
          .then((res) => {
            if (res.data.success) {
              this.$toast.success("Organizer Updated");
              this.isUpdate = !this.isUpdate;
              this.organizer = {
                name: "",
                url: "",
              };
              this.getAllOrganizer();
            } else {
              this.$toast.warning(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      cancelUpdate(item) {
        this.isUpdate = !this.isUpdate;
        this.organizer = {
          name: "",
          url: "",
        };
        this.organizers.splice(this.updateIndex, 0, item);
        // this.organizers.push(item);
      },
      deleteOrganizer(id) {
        Organizer.deleteOrganizer(id)
          .then((res) => {
            console.log(res);
            this.$toast.success("Organizer Deleted");
            this.getAllOrganizer();
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      getAllOrganizer() {
        Organizer.getAllOrganizer().then((res) => {
          if (res.data.success) {
            console.log(res.data.result);
            this.organizers = res.data.result;
          }
        });
      },
      updateOrganizer(item, index) {
        this.organizer = item;
        this.organizers.splice(index, 1);
        this.isUpdate = true;
        this.updateIndex = index;
      },
    },
    created() {
      this.getAllOrganizer();
    },
  };
</script>
