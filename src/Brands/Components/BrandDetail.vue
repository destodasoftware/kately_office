<template>
  <div v-if="brand" class="row">
    <div v-if="myBrand" class="col-md-12">
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nama Brand</label>
          <input type="text" class="form-control" v-model="myBrand.name">
        </div>
        <div class="form-group">
          <button @click="onUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="onCancel" class="btn btn-link text-muted">Batalkan</button>
          <slot name="action"></slot>
        </div>
      </div>
      <div @click="onEdit" v-if="!isEdit">
        <div class="form-group">
          <label>Nama Brand</label>
          <div class="text-primary">{{ myBrand.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandDetail',
  props: {
    brand: Object
  },
  data () {
    return {
      myBrand: undefined,
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
      this.$emit('onUpdate', this.myBrand)
    }
  },
  watch: {
    brand (n, o) {
      this.myBrand = n
    }
  },
  mounted () {
    this.myBrand = this.brand
  }
}
</script>
