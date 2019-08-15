<template>
  <KatelyBaseLayout>
    <CommonHeader slot="content">
      <span slot="title">Kelola Brand</span>
    </CommonHeader>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <button v-b-modal.modal-BrandCreate class="btn btn-primary">Brand Baru</button>
        <button v-b-modal.modal-BrandDetail v-if="brand" class="btn btn-primary">Detail Brand {{ brand.name }}</button>
        <button v-b-modal.modal-BrandDestroy v-if="brand" class="btn btn-danger">Hapus Brand</button>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <BrandFilter @onFilter="onFilterBrand" />
          </div>
        </div>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <BrandList :brands="brands" @onSelect="onSelectBrand" />
          </div>
        </div>
      </div>
    </div>
    <b-modal
      hide-footer
      ref="modal-BrandCreate"
      slot="content"
      id="modal-BrandCreate"
      title="Buat Brand"
    >
      <BrandCreate @onCreate="onCreateBrand" />
    </b-modal>
    <b-modal
      v-if="brand"
      hide-footer
      ref="modal-BrandDetail"
      slot="content"
      id="modal-BrandDetail"
      title="Ubah Brand"
    >
      <BrandDetail :brand="brand" @onUpdate="onUpdateBrand" />
    </b-modal>
    <b-modal
      v-if="brand"
      hide-footer
      ref="modal-BrandDestroy"
      slot="content"
      id="modal-BrandDestroy"
      title="Ubah Brand"
    >
      <BrandDestroy :brand="brand" @onDestroy="onDestroyBrand" />
    </b-modal>
  </KatelyBaseLayout>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import CommonHeader from '@/Commons/CommonHeader'

import BrandService from '@/Brands/BrandService'
import BrandList from '@/Brands/Components/BrandList'
import BrandCreate from '@/Brands/Components/BrandCreate'
import BrandDetail from '@/Brands/Components/BrandDetail'
import BrandDestroy from '@/Brands/Components/BrandDestroy'
import BrandFilter from '@/Brands/Components/BrandFilter'

export default {
  name: 'BrandMainManager',
  mixins: [
    MixinHttp,
    BrandService
  ],
  components: {
    KatelyBaseLayout,
    CommonHeader,
    BrandList,
    BrandCreate,
    BrandDetail,
    BrandDestroy,
    BrandFilter
  },
  methods: {
    onCreateBrand (value) {
      this.brand = value
      this.createBrand()
        .then((response) => {
          this.listBrand()
        })
    },
    onSelectBrand (value) {
      this.retrieveBrand(value.id)
    },
    onUpdateBrand (value) {
      this.brand = value
      this.updateBrand(value.id, this.brand)
        .then((response) => {
          this.listBrand()
        })
    },
    onDestroyBrand (value) {
      this.destroyBrand(value.id)
        .then((response) => {
          this.listBrand()
        })
    },
    onFilterBrand (query) {
      this.queryBrand = query
      this.listBrand()
    }
  },
  mounted () {
    this.httpInit()
    this.listBrand()
  }
}
</script>
