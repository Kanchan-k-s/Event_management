<template>
  <div class="container w-50">
    <h1 class="text-center">Category</h1>
    <div class="input-group mb-3">
      <span class="input-group-text">Name:</span>
      <input
        type="text"
        class="form-control"
        v-model="category.name"
        placeholder="Name"
        aria-label="Name"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group text-center mb-3">
      <button class="btn btn-primary" @click="add" v-if="!isUpdate">
        Add category
      </button>
      <button class="btn btn-primary" @click="update" v-if="isUpdate">
        Edit category
      </button>
      <button class="btn btn-danger" @click="cancelUpdate()" v-if="isUpdate">
        Cancel
      </button>
    </div>
  </div>

  <!-- <h1>{{ categorys }}</h1> -->
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
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categorys" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <button
              :disabled="isUpdate"
              class="btn btn-danger"
              @click="deletecategory(item.id)"
            >
              Delete
            </button>
            <button
              class="btn btn-warning"
              @click="updatecategory(item, index)"
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
  import category from "../services/category";
  import {useVuelidate} from "@vuelidate/core";
  import {required} from "@vuelidate/validators";

  export default {
    setup() {
      // return { v$: useVuelidate() };
    },
    data() {
      return {
        v$: useVuelidate(),
        category: {
          name: "",
        },
        categorys: [],
        isUpdate: false,
        updateIndex: "",
      };
    },
    validations() {
      return {
        category: {
          name: {required, minLength: 5},
        }, // Matches this.firstName
      };
    },
    methods: {
      add() {
        // console.log(this.v$);
        category
          .addCategory(this.category)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$toast.success("category Added");
              this.getAllcategory();
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
        category
          .updateCategory(this.category)
          .then((res) => {
            if (res.data.success) {
              this.$toast.success("category Updated");
              this.isUpdate = !this.isUpdate;
              this.category = {
                name: "",
                email: "",
              };
              this.getAllcategory();
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
        this.category = {
          name: "",
          email: "",
        };
        this.getAllcategory();
        // this.categorys.push(item);
      },
      deletecategory(id) {
        category
          .deleteCategory(id)
          .then((res) => {
            console.log(res);
            this.$toast.success("category Deleted");
            this.getAllcategory();
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      getAllcategory() {
        category.getAllCategory().then((res) => {
          if (res.data.success) {
            console.log(res.data.result);
            this.categorys = res.data.result;
          }
        });
      },
      updatecategory(item, index) {
        this.category = item;
        this.categorys.splice(index, 1);
        this.isUpdate = true;
        this.updateIndex = index;
      },
    },
    created() {
      this.getAllcategory();
    },
  };
</script>
