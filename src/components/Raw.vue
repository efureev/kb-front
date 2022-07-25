<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div>
    <h5 v-if="title">
      {{ title }}
    </h5>
    <pre><slot /></pre>
  </div>
</template>

<style scoped>
div {
  margin: 5px 0;
  color: #333;
  text-align: left;
  background-color: white;
  border: 1px solid red;
}

pre {
  margin: 0;
}

h5 {
  padding-bottom: 10px;
  margin: 10px 10px 0;
  color: gray;
  border-bottom: 1px dashed gray;
}
</style>
