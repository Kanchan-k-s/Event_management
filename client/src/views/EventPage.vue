<template>
  <div class="container w-70">
    <h1 class="text-center">
      <v-container>
        <v-row>
          <v-col>Event</v-col>
          <v-col v-if="isUpdate">
            <v-switch
              color="indigo"
              v-model="event.status"
              inset
              true-value="active"
              false-value="inactive"
            ></v-switch
          ></v-col>
        </v-row>
      </v-container>
    </h1>
    <v-container
      :style="
        'background-color:' +
        event.color +
        ' ;color:' +
        (event.color ^ 0x00ffffff)
      "
    >
      <v-row>
        <v-col>
          <div class="input-group mb-3">
            <span class="input-group-text">Name:</span>
            <input
              type="text"
              class="form-control"
              v-model="event.name"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">DESC: </span>
            <input
              type="text"
              class="form-control"
              v-model="event.desc"
              placeholder="DESCRIPTION"
              aria-label="DESCRIPTION"
              aria-describedby="basic-addon2"
            />
          </div>
        </v-col>
        <v-col>
          <div class="input-group mb-3">
            <span class="input-group-text">Category: </span>
            <v-select
              label="Select category"
              class="form-control"
              :items="categorys"
              item-title="name"
              item-value="id"
              v-model="event.eventCategoryId"
            ></v-select>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <div class="input-group mb-3">
              <span class="input-group-text">Time Zone: </span>
              <v-select
                label="Select category"
                class="form-control"
                :items="time_zones"
                v-model="event.time_zone"
              ></v-select>
            </div>
          </v-row>
        </v-col>
        <v-col>
          <div class="input-group mb-3">
            <span class="input-group-text">Color: </span>
            <v-color-picker
              class="form-control"
              show-swatches
              :hide-canvas="true"
              :hide-sliders="true"
              :hide-inputs="true"
              width="80%"
              v-model="event.color"
            ></v-color-picker>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="input-group mb-3">
            <span class="input-group-text">Start Date: </span>
            <input
              type="date"
              class="form-control"
              v-model="event.start_date"
              placeholder="START DATE"
              aria-label="START DATE"
              aria-describedby="basic-addon3"
            />
          </div>
        </v-col>
        <v-col>
          <div class="input-group mb-3">
            <span class="ms-10 input-group-text">Start Time: </span>
            <input
              type="time"
              class="form-control"
              v-model="event.start_time"
              placeholder="START Time"
              aria-label="START Time"
              aria-describedby="basic-addon3"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="input-group mb-3">
            <span class="input-group-text">End Date: </span>
            <input
              type="date"
              class="form-control"
              v-model="event.end_date"
              placeholder="END_DATE"
              aria-label="END_DATE"
              aria-describedby="basic-addon4"
            />
          </div>
        </v-col>
        <v-col>
          <div class="input-group mb-3">
            <span class="ms-10 input-group-text">End Time: </span>
            <input
              type="time"
              class="form-control"
              v-model="event.end_time"
              placeholder="END_Time"
              aria-label="END_Time"
              aria-describedby="basic-addon4"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <div class="input-group mb-3">
          <button class="btn btn-primary" @click="add" v-if="!isUpdate">
            Add event
          </button>
          <button class="btn btn-primary" @click="update" v-if="isUpdate">
            Edit event
          </button>
          <button
            class="btn btn-danger"
            @click="cancelUpdate()"
            v-if="isUpdate"
          >
            Cancel
          </button>
        </div>
      </v-row>
    </v-container>

    <!-- <div class="input-group mb-3" >
      <span class="input-group-text">Status:</span>
    </div> -->
  </div>

  <!-- <h1>{{ events }}</h1> -->
  <div class="w-100">
    <v-table
      theme="dark"
      fixed-header
      width="300px"
      height="600px"
      density="compact"
    >
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Time Zone</th>
          <th class="text-left">Starts</th>
          <th class="text-left">Ends</th>
          <th class="text-left">Status</th>
          <th class="text-left">Category</th>
          <th class="text-left">Status</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in events"
          :style="
            'background-color:' +
            item.color +
            ' ;color:' +
            (item.color ^ 0x00ffffff)
          "
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.desc }}</td>
          <td>{{ item.time_zone }}</td>
          <td>{{ item.start_date }} {{ item.start_time }}</td>
          <td>{{ item.end_date }} {{ item.end_time }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.category }}</td>
          <td>
            <v-switch
              color="indigo"
              v-model="item.status"
              inset
              true-value="active"
              false-value="inactive"
              disabled
            ></v-switch>
          </td>
          <td>
            <v-row>
              <v-col>
                <button
                  :disabled="isUpdate || item.status === 'inactive'"
                  class="btn btn-success"
                  @click="hostEvent(item)"
                >
                  Host
                </button>
              </v-col>
              <v-col>
                <button
                  :disabled="isUpdate"
                  class="btn btn-danger"
                  @click="deleteevent(item.id)"
                >
                  Delete
                </button>
              </v-col>
              <v-col>
                <button
                  class="btn btn-warning"
                  @click="updateevent(item, index)"
                  :disabled="isUpdate"
                >
                  Edit
                </button>
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
  import category from "@/services/category";
  import event from "../services/event";
  import {useVuelidate} from "@vuelidate/core";
  import {required} from "@vuelidate/validators";
  import fetchOther from "../services/fetchOther";
  import organization from "@/services/organization";
  export default {
    setup() {
      // return { v$: useVuelidate() };
    },
    props: ["id"],
    data() {
      return {
        v$: useVuelidate(),
        time_zones: [],
        URL: "http://worldtimeapi.org/api/timezone",
        event: {
          name: "",
          start_date: null,
          start_time: null,
          time_zone: null,
          end_date: null,
          end_time: null,
          eventCategoryId: null,
          color: "",
          desc: "",
          status: "active",
          organizerId: parseInt(this.id),
        },
        events: [],
        categorys: [],
        isUpdate: false,
        updateIndex: "",
      };
    },
    validations() {
      return {
        event: {
          name: {required, minLength: 5},
          email: {required},
        }, // Matches this.firstName
      };
    },
    methods: {
      hostEvent(item) {
        organization.getOrganizer(this.$route.params.id).then((res) => {
          let url = res.data.result.url;
          // console.log(url);
          item["status"] = "hosting";
          // console.log(item);
          event
            .updateEvent(item)
            .then((response) => {
              console.log(response);
              this.$router.push(
                "/host/" + url + "?auth=org&eventId=" + item.id
              );
            })
            .catch((e) => {
              console.log(e);
            });
        });
      },
      add() {
        // console.log(this.event);
        event
          .addEvent(this.event)
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.$toast.success("event Added");
              this.getAllevent();
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
        event
          .updateEvent(this.event)
          .then((res) => {
            if (res.data.success) {
              this.$toast.success("event Updated");
              this.isUpdate = !this.isUpdate;
              this.event = {
                name: "",
                start_date: null,
                start_time: null,
                time_zone: null,
                end_date: null,
                end_time: null,
                eventCategoryId: null,
                color: "",
                desc: "",
                status: "active",
                organizerId: parseInt(this.id),
              };
              this.getAllevent();
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
        this.event = {
          name: "",
          start_date: null,
          start_time: null,
          time_zone: null,
          end_date: null,
          end_time: null,
          eventCategoryId: null,
          color: "",
          desc: "",
          status: "active",
          organizerId: parseInt(this.id),
        };
        this.getAllevent();
        // this.events.push(item);
      },
      deleteevent(id) {
        event
          .deleteEvent(id)
          .then((res) => {
            console.log(res);
            this.$toast.success("event Deleted");
            this.getAllevent();
          })
          .catch((err) => {
            // console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      getAllevent() {
        event
          .getAllEventByOrganizer(this.id)
          .then((res) => {
            if (res.data.success) {
              // console.log(res.data.result);
              this.events = res.data.result;
              this.events.map((ele) => {
                let cat = this.categorys.find(
                  (e) => e.id === ele.eventCategoryId
                );
                // console.log(cat);
                ele["category"] = cat.name;
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            this.$toast.error(err.message);
          });
      },
      getAllcategory() {
        category.getAllCategory().then((res) => {
          if (res.data.success) {
            // console.log(res.data.result);
            this.categorys = res.data.result;
          }
        });
      },
      updateevent(item, index) {
        this.event = item;
        this.events.splice(index, 1);
        this.isUpdate = true;
        this.updateIndex = index;
      },
      getAllTimeZones() {
        fetchOther.fetchTimeZone(this.URL).then(async (response) => {
          const data = await response.json();
          this.time_zones = data;
        });
      },
    },
    created() {
      this.getAllcategory();
      this.getAllevent();
      this.getAllTimeZones();
    },
  };
</script>
