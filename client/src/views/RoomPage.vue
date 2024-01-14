<template>
  <h1>hi</h1>
</template>

<script>
  export default {
    data() {
      return {};
    },
    created() {
      if (this.$route.query.auth === "org") {
        console.log("socket open");
      }
    },
  };
</script>
