<template>
  <button @click="print" class="btn btn-outline-primary no-print">Print</button>
</template>

<script>
export default {
  data () {
    return {
      window: undefined
    }
  },
  methods: {
    print () {
      window.print()
    }
  }
}
</script>

<style>

</style>
