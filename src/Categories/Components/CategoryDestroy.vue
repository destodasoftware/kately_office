<template>
  <div v-if="category" class="row">
    <div v-if="myCategory" class="col-md-12">
      <div class="form-group">
        <p class="text-danger">
          Anda yakin ingin menghapus {{ myCategory.name }}?
        </p>
      </div>
      <div class="form-group">
        <button
          class="btn btn-danger"
          @click="onDestroy"
        >
          Ya, Hapus!
        </button>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryDestroy',
  props: {
    category: Object
  },
  data () {
    return {
      myCategory: undefined
    }
  },
  methods: {
    onDestroy () {
      this.$emit('onDestroy', this.myCategory)
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
