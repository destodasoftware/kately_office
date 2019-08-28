<template>
  <common-layout>
    <common-header><font-awesome-icon icon="folder-open"/> Kategori</common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-outline-primary" v-b-modal.modal-CategoryCreate>
              <font-awesome-icon icon="plus-circle"/> Kategori Baru
            </button>
            <button class="btn btn-outline-primary" v-b-modal.modal-CategoryFilter>
              <font-awesome-icon icon="filter"/> Filter
            </button>
            <button v-if="category" class="btn btn-outline-primary" v-b-modal.modal-CategoryDetail>
              <font-awesome-icon icon="edit"/> Informasi Kategori
            </button>
            <button v-if="category" class="btn btn-link text-secondary" v-b-modal.modal-CategoryDestroy>
              <font-awesome-icon icon="trash"/> Hapus Kategori
            </button>
          </div>
          <category-list
            @onSelect="onSelectCategory"
            :categories="categories"
          />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryCategory.page"
          :total-rows="paginationCategory.count"
          @change="onPaginateCategory"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      hide-footer
      id="modal-CategoryCreate"
      title="Buat Kategori Baru"
      size="lg"
      ref="modal-CategoryCreate"
      scrollable
    >
      <category-create @onCreate="onCreateCategory" />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-CategoryDetail"
      title="Informasi Pelanggan"
      size="lg"
      ref="modal-CategoryDetail"
      scrollable
    >
      <category-detail
        :category="category"
        @onUpdate="onUpdateCategory"
      />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-CategoryDestroy"
      title="Hapus Kategori"
      size="lg"
      ref="modal-CategoryDestroy"
      scrollabe
    >
      <category-destroy :category="category" @onDestroy="onDestroyCategory" />
    </b-modal>
    <b-modal
      hide-footer
      id="modal-CategoryFilter"
      title="Cari Kategori"
      ref="modal-CategoryFilter"
      scrollable
    >
      <category-filter @onFilter="onFilterCategory"></category-filter>
    </b-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperError from '@/Helpers/HelperError'

import CategoryService from '@/Categories/CategoryService'
import CategoryCreate from '@/Categories/Components/CategoryCreate'
import CategoryList from '@/Categories/Components/CategoryList'
import CategoryDetail from '@/Categories/Components/CategoryDetail'
import CategoryDestroy from '@/Categories/Components/CategoryDestroy'
import CategoryFilter from '@/Categories/Components/CategoryFilter'

export default {
  name: 'CategoryMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'category-create': CategoryCreate,
    'category-list': CategoryList,
    'category-detail': CategoryDetail,
    'category-destroy': CategoryDestroy,
    'category-filter': CategoryFilter
  },
  mixins: [
    MixinHttp,
    HelperError,
    CategoryService
  ],
  methods: {
    onSelectCategory (category) {
      this.retrieveCategory(category.id)
        .catch((error) => {
          this.errorHandler(error)
        })
    },
    onCreateCategory (category) {
      this.category = category
      this.createCategory()
        .then((response) => {
          this.listCategory()
          this.$refs['modal-CategoryCreate'].hide()
        })
    },
    onUpdateCategory (category) {
      this.category = category
      this.updateCategory(category.id)
        .then((response) => {
          this.listCategory()
          this.$refs['modal-CategoryDetail'].hide()
        })
    },
    onDestroyCategory (category) {
      this.destroyCategory(category.id)
        .then((response) => {
          this.listCategory()
          this.$refs['modal-CategoryDestroy'].hide()
        })
    },
    onPaginateCategory (page) {
      this.queryCategory.page = page
      this.listCategory()
    },
    onFilterCategory (query) {
      this.queryCategory.name = query.name
      this.$refs['modal-CategoryFilter'].hide()
      this.category = undefined
      this.listCategory()
    }
  },
  mounted () {
    this.httpInit()
    this.listCategory()
  }
}
</script>

<style>

</style>
