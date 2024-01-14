<template>
  <div class="container w-50">
    <h1 class="text-center">Member</h1>
    <div class="input-group mb-3">
      <span class="input-group-text">Name:</span>
      <input
        type="text"
        class="form-control"
        v-model="member.name"
        placeholder="Name"
        aria-label="Name"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Email: </span>
      <input
        type="text"
        class="form-control"
        v-model="member.email"
        placeholder="EMAIL"
        aria-label="EMAIL"
        aria-describedby="basic-addon2"
      />
    </div>
    <div class="input-group mb-3">
      <button class="btn btn-primary" @click="add" v-if="!isUpdate">
        Add member
      </button>
      <button class="btn btn-primary" @click="update" v-if="isUpdate">
        Edit member
      </button>
      <button class="btn btn-danger" @click="cancelUpdate()" v-if="isUpdate">
        Cancel
      </button>
    </div>
  </div>

  <!-- <h1>{{ members }}</h1> -->
  <div class="container w-55 p-3">
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
          <th class="text-left">EMAIL</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in members" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <button
              :disabled="isUpdate"
              class="btn btn-danger"
              @click="deletemember(item.id)"
            >
              Delete
            </button>
            <button
              class="btn btn-warning"
              @click="updatemember(item, index)"
              :disabled="isUpdate"
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
  import member from "../services/member";
  import {useVuelidate} from "@vuelidate/core";
  import {required} from "@vuelidate/validators";

  export default {
    setup() {
      // return { v$: useVuelidate() };
    },
    props: ["id"],
    data() {
      return {
        v$: useVuelidate(),
        member: {
          name: "",
          email: "",
          organizerId: this.id,
        },
        members: [],
        isUpdate: false,
        updateIndex: "",
      };
    },
    validations() {
      return {
        member: {
          name: {required, minLength: 5},
          email: {required},
        }, // Matches this.firstName
      };
    },
    methods: {
      add() {
        // console.log(this.v$);
        member
          .addMember(this.member)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$toast.success("member Added");
              this.getAllmember();
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
        member
          .updateMember(this.member)
          .then((res) => {
            if (res.data.success) {
              this.$toast.success("member Updated");
              this.isUpdate = !this.isUpdate;
              this.member = {
                name: "",
                email: "",
              };
              this.getAllmember();
            } else {
              this.$toast.warning(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      cancelUpdate() {
        this.isUpdate = !this.isUpdate;
        this.member = {
          name: "",
          email: "",
        };
        this.getAllmember();
        // this.members.push(item);
      },
      deletemember(id) {
        member
          .deleteMember(id)
          .then((res) => {
            console.log(res);
            this.$toast.success("member Deleted");
            this.getAllmember();
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      getAllmember() {
        member.getAllMember(this.id).then((res) => {
          if (res.data.success) {
            console.log(res.data.result);
            this.members = res.data.result;
          }
        });
      },
      updatemember(item, index) {
        this.member = item;
        this.members.splice(index, 1);
        this.isUpdate = true;
        this.updateIndex = index;
      },
    },
    created() {
      this.getAllmember();
    },
  };
</script>
