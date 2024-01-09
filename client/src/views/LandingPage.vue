<template>
  <div>
    <h1>Hi</h1>
    <button>Click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
