<template>
  <div class="card bg-light mb-4">
    <div class="card-header">
      Pilihan Brand
    </div>
    <div class="card-body">
      <b-button class="mb-4" v-if="!brand" v-b-modal.modal-1 variant="info">Pilih</b-button>
      <b-button class="mb-4" v-if="brand" v-b-modal.modal-1 variant="info">{{ brand.name }} Terpilih</b-button>
      <b-modal id="modal-1" title="Pilih Brand">
        <p class="my-4">
          <BrandList
            @brandRetrieve="brandRetrieve"
            :propBrands="propBrands"
            :propPagination="propPaginationBrand"
            @brandListSearch="brandListSearch"
          />
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import BrandList from '@/components/brands/BrandList'

export default {
  name: 'ArticleListModal',
  components: {
    BrandList
  },
  props: {
    propBrands: Array,
    propPaginationBrand: Object
  },
  data () {
    return {
      brand: undefined
    }
  },
  methods: {
    brandRetrieve (value) {
      this.brand = value
      this.$emit('brandRetrieve', value)
    },
    brandListSearch (query) {
      this.$emit('brandListSearch', query)
    }
  }
}
</script>

<style>

</style>
