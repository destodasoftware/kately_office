<template>

</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

export default {
  name: 'SaleItemList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propSaleItems: Array,
    propPagination: Object
  },
  data () {
    return {
      saleItem: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    saleItemRetrieve (value) {
      this.saleItem = value
      this.$emit('saleItemRetrieve', value)
    },
    saleItemListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('saleItemListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
