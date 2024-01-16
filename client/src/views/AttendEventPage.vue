<template>
  <div class="container w-75 p-3">
    <div class="text-center float-center">
      <h1>Event Lists</h1>
      <v-container class="text-center">
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-select
              label="Select Category"
              :items="categorys"
              item-title="name"
              item-value="id"
              v-model="value"
            ></v-select>
          </v-col>
          <v-col style="flex-grow: 0; margin-top: 1%"
            ><button
              class="btn btn-warning"
              @click="
                value = '';
                search(value);
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                />
              </svg></button
          ></v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="16" sm="6" md="4">
            <v-btn
              class="btn btn-primary"
              block
              rounded="xl"
              @click="search"
              size="x-large"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
  <v-container>
    <v-row>
      <v-col class="container w-75 p-3">
        <h5>List of all Events Attending</h5>
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
              <th class="text-left">start</th>
              <th class="text-left">end</th>
              <th class="text-left">time_zone</th>
              <th class="text-left">desc</th>
              <th class="text-left">priority</th>
              <th class="text-left">status</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :style="'background-color:' + item.color"
              v-for="item in AttendingEvents"
              :key="item.id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.start_date }} {{ item.start_time }}</td>
              <td>{{ item.end_date }} {{ item.end_time }}</td>
              <td>{{ item.time_zone }}</td>
              <td>{{ item.desc }}</td>
              <td>{{ item.priority }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button
                  class="btn btn-warning"
                  :disabled="item.status === 'inactive'"
                  @click="connect(item)"
                >
                  Connect
                </button>
                <button class="btn btn-danger" @click="unAttendEvent(item.id)">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

      <v-col class="container w-75 p-3">
        <h5>List of all Events Not attending</h5>
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
              <th class="text-left">start</th>
              <th class="text-left">end</th>
              <th class="text-left">time_zone</th>
              <th class="text-left">desc</th>
              <th class="text-left">status</th>
              <th class="text-left">Priority</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :style="
                'background-color:' +
                item.color +
                ' ;color:' +
                (item.color ^ 0x00ffffff)
              "
              v-for="item in canAttendEvents"
              :key="item.id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.start_date }} {{ item.start_time }}</td>
              <td>{{ item.end_date }} {{ item.end_time }}</td>
              <td>{{ item.time_zone }}</td>
              <td>{{ item.desc }}</td>
              <td>{{ item.status }}</td>
              <td>
                <v-select
                  v-model="item.priority"
                  label="Select Priority"
                  :items="prioritys"
                  item-title="name"
                  item-value="value"
                ></v-select>
              </td>
              <td>
                <button
                  class="btn btn-primary"
                  @click="attendEvent(item.id, item.priority)"
                >
                  Attend
                </button>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import attendEvent from "../services/attendEvent";
  import category from "../services/category";
  import organization from "../services/organization";

  export default {
    data() {
      return {
        events: [],
        categorys: [],
        value: "",
        canAttendEvents: [],
        AttendingEvents: [],
        allEvents: [],
        priority: 1,
        prioritys: [
          {name: "Low Priority", value: 1},
          {name: "Medium Priority", value: 2},
          {name: "High Priority", value: 3},
        ],
      };
    },
    methods: {
      search() {
        this.getAllEvents();
        this.getAllAttendingEvent();
      },
      getAllcategory() {
        category
          .getAllCategory()
          .then((res) => {
            if (res.data.success) {
              this.categorys = res.data.result;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
      connect(item) {
        // console.log("hello", item.organizerId);
        organization
          .getOrganizer(item.organizerId)
          .then((res) => {
            let url = res.data.result.url;
            this.$router.push(
              "/host/" +
                url +
                "?auth=member&eventId=" +
                item.id +
                "&memberId=" +
                this.$route.params.id
            );
          })
          .catch((e) => {
            console.log(e);
          });
      },
      disconnect() {},
      getAllEvents() {
        attendEvent
          .getAllEvents()
          .then((res) => {
            // console.log(res.data.result);
            this.events = res.data.result;
            this.events.map((ele) => {
              ele["priority"] = 1;
            });
            if (this.value === "") {
              // this.events = this.allEvents;
              // console.log("dfghjk", this.events);
              this.getAllAttendingEvent();
            } else {
              this.events = this.events.filter(
                (e) => e.eventCategoryId === this.value
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
      getAllAttendingEvent() {
        attendEvent
          .getAllAttendingEvents(this.$route.params.id)
          .then((res) => {
            let result = res.data.result;
            let list = [];
            result.forEach((element) => {
              list.push(element.eventId);
            });

            result.map((e) => {
              this.prioritys.forEach((ele) => {
                if (e.priority === ele.value) {
                  e["priority"] = ele.name;
                }
              });
            });

            // console.log(result);

            // console.log("fghj", this.events);
            this.events.map((ele) => {
              result.forEach((e) => {
                if (ele.id === e.eventId) {
                  ele["priority"] = e.priority;
                }
              });
            });
            this.canAttendEvents = this.events.filter((ele) => {
              if (!list.includes(ele.id)) {
                return ele;
              }
            });
            // console.log(this.canAttendEvents);
            this.AttendingEvents = this.events.filter((ele) => {
              if (list.includes(ele.id)) {
                return ele;
              }
            });

            // console.log(this.AttendingEvents);

            // this.canAttendEvents = this.canAttendEvents.filter((ele) => {
            //   return ele.status !== "active";
            // });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      unAttendEvent(eventId) {
        const data = {
          eventId,
          memberId: this.$route.params.id,
        };
        attendEvent
          .unAttendEvent(data)
          .then((res) => {
            if (res.data.success) {
              this.$toast.success("Event Canceled");
              this.search();
            } else {
              this.$toast.warning(res.data.msg);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
      attendEvent(eventId, priority) {
        const data = {
          eventId,
          memberId: this.$route.params.id,
          priority,
        };
        attendEvent
          .attendEvent(data)
          .then((res) => {
            if (res.data.success) {
              // const result = res.data.result;
              // console.log(result);
              this.$toast.success("Attending the event");

              this.search();
            } else {
              this.$toast.warning(res.data.msg);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    created() {
      this.getAllEvents();

      this.getAllcategory();
    },
  };
</script>
