<template>
  <div class="row">
    <div v-if="categories.length <= 0" class="col-md-12">
      <div class="card">
        <div class="card-body">No data</div>
      </div>
    </div>
    <div v-if="categories.length > 0" class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama Kategori</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{'bg-primary text-light': category.id === id}"
            @click="onSelect(category)"
            v-for="category in categories" :key="category.id"
          >
            <td>{{ category.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: {
    categories: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (category) {
      this.id = category.id
      this.$emit('onSelect', category)
    }
  }
}
</script>

<style>

</style>
