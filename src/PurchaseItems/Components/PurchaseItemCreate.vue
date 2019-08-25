<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama</label>
        <input
          type="text"
          class="form-control"
          v-model="myPurchaseItem.name"
        >
      </div>
      <div class="form-group">
        <button
          @click="onCreate"
          class="btn btn-primary"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseItemCreate',
  data () {
    return {
      myPurchaseItem: {
        name: undefined
      }
    }
  },
  methods: {
    onCreate () {
      this.$emit('onCreate', this.myPurchaseItem)
    }
  }
}
</script>

<style>

</style>
