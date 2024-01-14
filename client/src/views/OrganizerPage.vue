<template>
  <div class="container w-75">
    <div class="text-center">
      <h1>Hello Organizer</h1>
      <button
        class="btn btn-warning"
        @click="
          isCategory = !isCategory;
          isMember = false;
          isEvent = false;
        "
      >
        Category
      </button>
      <button
        class="btn btn-warning ms-12"
        @click="
          isMember = !isMember;
          isCategory = false;
          isEvent = false;
        "
      >
        Member
      </button>
      <button
        class="btn btn-warning ms-12"
        @click="
          isEvent = !isEvent;
          isCategory = false;
          isMember = false;
        "
      >
        Event
      </button>
    </div>

    <member-page v-if="isMember" :id="$route.params.id"></member-page>
    <category-page v-if="isCategory"></category-page>
    <event-page v-if="isEvent" :id="$route.params.id"></event-page>
  </div>
</template>

<script>
  import MemberPage from "./MemberPage.vue";
  import CategoryPage from "./CategoryPage.vue";
  import EventPage from "./EventPage.vue";

  export default {
    components: {MemberPage, CategoryPage, EventPage},
    data() {
      return {
        members: [],
        isCategory: false,
        isMember: false,
        isEvent: false,
      };
    },
  };
</script>
