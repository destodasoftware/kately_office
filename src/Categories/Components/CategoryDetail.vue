<template>
  <div v-if="category" class="row">
    <div v-if="myCategory" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Nama Kategori</label>
          <div class="text-primary">{{ myCategory.name }}</div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nama Kategori</label>
          <input
            v-model="myCategory.name"
            type="text"
            class="form-control bg-light"
          >
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary"
            @click="onUpdate"
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
  name: 'CategoryDetail',
  props: {
    category: Object
  },
  data () {
    return {
      myCategory: undefined,
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
      this.$emit('onUpdate', this.myCategory)
    }
  },
  watch: {
    category (n, o) {
      this.myCategory = n
    }
  },
  mounted () {
    this.myCategory = this.category
  }
}
</script>

<style>

</style>
