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

          <v-col cols="16" sm="6" md="4">
            <v-btn
              class="btn btn-primary"
              block
              rounded="xl"
              @click="search(value)"
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
              <th class="text-left">start_date</th>
              <th class="text-left">start_time</th>
              <th class="text-left">end_date</th>
              <th class="text-left">end_time</th>
              <th class="text-left">time_zone</th>
              <th class="text-left">desc</th>
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
              <td>{{ item.start_date }}</td>
              <td>{{ item.start_time }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.end_time }}</td>
              <td>{{ item.time_zone }}</td>
              <td>{{ item.desc }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button class="btn btn-warning" @click="connect(item)">
                  Connect
                </button>
                <button class="btn btn-primary" @click="unAttendEvent(item.id)">
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
              <th class="text-left">start_date</th>
              <th class="text-left">start_time</th>
              <th class="text-left">end_date</th>
              <th class="text-left">end_time</th>
              <th class="text-left">time_zone</th>
              <th class="text-left">desc</th>
              <th class="text-left">status</th>
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
              <td>{{ item.start_date }}</td>
              <td>{{ item.start_time }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.end_time }}</td>
              <td>{{ item.time_zone }}</td>
              <td>{{ item.desc }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button class="btn btn-primary" @click="attendEvent(item.id)">
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
  // import {socket} from "@/socket";

  export default {
    data() {
      return {
        events: [],
        categorys: [],
        value: "",
        canAttendEvents: [],
        AttendingEvents: [],
        allEvents: [],
      };
    },
    methods: {
      search(val) {
        this.getAllEvents();
        if (val.length !== 0) {
          this.events = this.allEvents.filter(
            (ele) => ele.eventCategoryId === val
          );
        } else {
          this.events = this.allEvents;
        }

        this.getAllAttendingEvent();
      },
      getAllcategory() {
        category.getAllCategory().then((res) => {
          if (res.data.success) {
            this.categorys = res.data.result;
          }
        });
      },
      connect(item) {
        console.log("hello", item.organizerId);
        organization.getOrganizer(item.organizerId).then((res) => {
          let url = res.data.result.url;
          this.$router.push(
            "/host/" +
              url +
              "?auth=member&eventId=" +
              item.id +
              "&memberId=" +
              this.$route.params.id
          );
        });
        // this.$router.push('/host/')
        // socket.connect();
        // socket.emit("message", "hello" , )
        // let message = "hello";
        // socket.emit("sendMessage", message, (error) => {
        // $messageButton.removeAttribute("disabled");
        // console.log("hi",$messageInput)
        // $messageInput.value = "";
        // $messageInput.focus();
        // if (error) {
        //   return console.log("hi", error);
        // }
        // console.log("The message was delivered");
        // });
      },
      disconnect() {
        // socket.disconnect();
      },
      getAllEvents() {
        attendEvent.getAllEvents().then((res) => {
          // console.log(res.data.result);
          this.allEvents = res.data.result;
        });
      },
      getAllAttendingEvent() {
        attendEvent.getAllAttendingEvents(this.$route.params.id).then((res) => {
          let result = res.data.result;
          let list = [];
          result.forEach((element) => {
            list.push(element.eventId);
          });
          this.canAttendEvents = this.events.filter((ele) => {
            if (!list.includes(ele.id)) {
              return ele;
            }
          });
          this.AttendingEvents = this.events.filter((ele) => {
            if (list.includes(ele.id)) {
              return ele;
            }
          });
          // this.canAttendEvents = this.canAttendEvents.filter((ele) => {
          //   return ele.status !== "active";
          // });
        });
      },
      unAttendEvent(eventId) {
        const data = {
          eventId,
          memberId: this.$route.params.id,
        };
        attendEvent.unAttendEvent(data).then((res) => {
          if (res.data.success) {
            this.$toast.success("Event Canceled");
            this.search(this.value);
          } else {
            this.$toast.warning(res.data.msg);
          }
        });
      },
      attendEvent(eventId) {
        const data = {
          eventId,
          memberId: this.$route.params.id,
        };
        attendEvent.attendEvent(data).then((res) => {
          if (res.data.success) {
            this.$toast.success("Attending the event");

            this.search(this.value);
          } else {
            this.$toast.warning(res.data.msg);
          }
        });
      },
    },
    created() {
      this.getAllEvents();
      this.events = this.allEvents;
      this.getAllAttendingEvent();
      this.getAllcategory();
    },
  };
</script>
