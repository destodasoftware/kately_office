<template>
  <common-layout>
    <common-header>
      Kelola Brand
    </common-header>
    <!-- section-1 -->
    <div class="row mb-4">
      <div class="col-md-8">
        <button
          class="btn btn-primary"
          v-b-modal.modal-BrandCreate
        >
          Brand Baru
        </button>
        <button
          v-if="brand"
          class="btn btn-outline-primary"
          v-b-modal.modal-BrandDetail
        >
          Informasi Brand
        </button>
        <button
          v-if="brand"
          class="btn btn-outline-dark"
          v-b-modal.modal-BrandDestroy
        >
          Hapus Brand
        </button>
      </div>
      <div class="col-md-4">
        <b-pagination
          class="float-right"
          v-model="queryBrand.page"
          :total-rows="paginationBrand.count"
          @change="onPaginateBrand"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
        <button
          class="btn btn-primary float-right ml-2 mr-2"
          v-b-modal.modal-BrandFilter
        >
          Filter
        </button>
      </div>
    </div>
    <!-- section-2 -->
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <brand-list
            @onSelect="onSelectBrand"
            :brands="brands"
          />
        </div>
      </div>
      <b-modal
        hide-footer
        id="modal-BrandCreate"
        title="Buat Brand Baru"
        size="lg"
        ref="modal-BrandCreate"
        scrollable
      >
        <brand-create @onCreate="onCreateBrand" />
      </b-modal>
      <b-modal
        hide-footer
        id="modal-BrandDetail"
        title="Informasi Brand"
        size="lg"
        ref="modal-BrandDetail"
        scrollable
      >
        <brand-detail
          :brand="brand"
          @onUpdate="onUpdateBrand"
        />
      </b-modal>
      <b-modal
        hide-footer
        id="modal-BrandDestroy"
        title="Hapus Brand"
        size="lg"
        ref="modal-BrandDestroy"
        scrollable
      >
        <brand-destroy
          :brand="brand"
          @onDestroy="onDestroyBrand"
        />
      </b-modal>
      <b-modal
        hide-footer
        id="modal-BrandFilter"
        title="Cari Brand"
        ref="modal-BrandFilter"
        scrollable
      >
        <brand-filter
          @onFilter="onFilterBrand"
        />
      </b-modal>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperError from '@/Helpers/HelperError'

import BrandService from '@/Brands/BrandService'
import BrandCreate from '@/Brands/Components/BrandCreate'
import BrandList from '@/Brands/Components/BrandList'
import BrandDetail from '@/Brands/Components/BrandDetail'
import BrandDestroy from '@/Brands/Components/BrandDestroy'
import BrandFilter from '@/Brands/Components/BrandFilter'

export default {
  name: 'BrandMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'brand-create': BrandCreate,
    'brand-list': BrandList,
    'brand-detail': BrandDetail,
    'brand-destroy': BrandDestroy,
    'brand-filter': BrandFilter
  },
  mixins: [
    MixinHttp,
    HelperError,
    BrandService
  ],
  methods: {
    onSelectBrand (brand) {
      this.retrieveBrand(brand.id)
    },
    onCreateBrand (brand) {
      this.brand = brand
      this.createBrand()
        .then((response) => {
          this.$refs['modal-BrandCreate'].hide()
        })
    },
    onUpdateBrand (brand) {
      this.brand = brand
      this.updateBrand(brand.id)
        .then((response) => {
          this.listBrand()
          this.$refs['modal-BrandDetail'].hide()
        })
    },
    onDestroyBrand (brand) {
      this.destroyBrand(brand.id)
        .then((response) => {
          this.listBrand()
          this.$refs['modal-BrandDestroy'].hide()
        })
    },
    onFilterBrand (query) {
      this.queryBrand.name = query.name
      this.$refs['modal-BrandFilter'].hide()
      this.brand = undefined
      this.listBrand()
    },
    onPaginateBrand (page) {
      this.queryBrand.page = page
      this.listBrand()
    }
  },
  mounted () {
    this.httpInit()
    this.listBrand()
  }
}
</script>

<style>

</style>
