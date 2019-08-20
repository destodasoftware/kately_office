<template>
  <div v-if="productVariant" class="row">
    <div v-if="myProductVariant" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Warna</label>
          <div class="text-primary">
            {{ myProductVariant.color }}
          </div>
        </div>
        <div class="form-group">
          <label>Ukuran</label>
          <div class="text-primary">
            {{ myProductVariant.size }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Warna</label>
          <input
            type="text"
            class="form-control"
            v-model="myProductVariant.color"
          >
        </div>
        <div class="form-group">
          <label>Ukuruan</label>
          <input
            type="text"
            class="form-control"
            v-model="myProductVariant.size"
          >
        </div>
        <div class="form-group">
          <label>Stok</label>
          <input
            type="text"
            class="form-control"
            v-model="myProductVariant.stock"
          >
        </div>
        <div class="form-group">
          <label>Harga</label>
          <input
            type="text"
            class="form-control"
            v-model="myProductVariant.price"
          >
        </div>
        <div class="form-group">
          <button
            @click="onUpdate"
            class="btn btn-primary"
          >
            Simpan
          </button>
          <button
            class="btn btn-link text-muted"
            @click="onCancel"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductVariantDetail',
  props: {
    productVariant: Object
  },
  data () {
    return {
      myProductVariant: undefined,
      isEdit: false
    }
  },
  methods: {
    onEdit () {
      this.isEdit = true
    },
    onCancel () {
      this.isEdit = false
    },
    onUpdate () {
      this.onCancel()
      this.$emit('onUpdate', this.myProductVariant)
    }
  },
  watch: {
    productVariant (n, o) {
      this.myProductVariant = n
    }
  },
  mounted () {
    this.myProductVariant = this.productVariant
  }
}
</script>

<style>

</style>
