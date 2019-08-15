<template>
  <common-layout>
    <common-header>
      Kelola Pelanggan
    </common-header>
    <div class="row mb-4">
      <div class="col-md-8">
        <button v-b-modal.modal-CustomerCreate class="btn btn-primary">Pelanggan Baru</button>
        <button
          v-if="customer"
          v-b-modal.modal-CustomerDetail
          class="btn btn-outline-primary"
        >
          Informasi Pelanggan
        </button>
        <button
          v-if="customer"
          v-b-modal.modal-CustomerDestroy
          class="btn btn-outline-dark"
        >
          Hapus Pelanggan
        </button>
        <customer-report @onExport="onExportCustomer"></customer-report>
      </div>
      <div class="col-md-4">
        <b-pagination
          class="float-right"
          v-model="queryCustomer.page"
          :total-rows="paginationCustomer.count"
          @change="onPaginateCustomer"
          :per-page="20"
          aria-controls="my-table"
        >
        </b-pagination>
        <button
          v-b-modal.modal-CustomerFilter
          class="btn btn-outline-primary float-right ml-2 mr-2"
        >
          Filter
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card">
          <customer-list @onSelect="onSelectCustomer" :customers="customers" />
        </div>
      </div>
    </div>
    <b-modal
      hide-footer
      id="modal-CustomerCreate"
      title="Buat Pelanggan Baru"
      size="lg"
      ref="modal-CustomerCreate"
      scrollable
    >
      <customer-create @onCreate="onCreateCustomer" />
    </b-modal>
    <!-- Modal Customer Detail -->
    <b-modal
      hide-footer
      id="modal-CustomerDetail"
      title="Informasi Pelanggan"
      size="lg"
      ref="modal-CustomerDetail"
      scrollable
    >
      <customer-detail @onUpdate="onUpdateCustomer" :customer="customer" />
    </b-modal>
    <!-- Modal Customer Destroy -->
    <b-modal
      hide-footer
      id="modal-CustomerDestroy"
      title="Hapus Pelanggan?"
      size="lg"
      ref="modal-CustomerDestroy"
      scrollable
    >
      <customer-destroy @onDestroy="onDestroyCustomer" :customer="customer" />
    </b-modal>
    <!-- Modal Customer Filter -->
    <b-modal
      hide-footer
      id="modal-CustomerFilter"
      title="Cari Pelanggan"
      ref="modal-CustomerFilter"
      scrollable
    >
      <customer-filter @onFilter="onFilterCustomer" />
    </b-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'
import HelperError from '@/Helpers/HelperError'
import HelperText from '@/Helpers/HelperText'

import CustomerService from '@/Customers/CustomerService'
import CustomerCreate from '@/Customers/Components/CustomerCreate'
import CustomerList from '@/Customers/Components/CustomerList'
import CustomerDetail from '@/Customers/Components/CustomerDetail'
import CustomerDestroy from '@/Customers/Components/CustomerDestroy'
import CustomerFilter from '@/Customers/Components/CustomerFilter'
import CustomerReport from '@/Customers/Components/CustomerReport'

export default {
  name: 'CustomerMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'customer-create': CustomerCreate,
    'customer-list': CustomerList,
    'customer-detail': CustomerDetail,
    'customer-destroy': CustomerDestroy,
    'customer-filter': CustomerFilter,
    'customer-report': CustomerReport
  },
  mixins: [
    MixinHttp,
    CustomerService,
    HelperError,
    HelperText
  ],
  methods: {
    onSelectCustomer (customer) {
      this.retrieveCustomer(customer.id)
    },
    onCreateCustomer (customer) {
      this.customer = customer
      this.customer.customer_code = this.generateSKU('CST')
      this.createCustomer()
        .then((response) => {
          this.listCustomer()
          this.$refs['modal-CustomerCreate'].hide()
        })
        .catch((error) => {
          this.errorHandler(error)
        })
    },
    onUpdateCustomer (customer) {
      this.updateCustomer(customer.id)
        .then((response) => {
          this.listCustomer()
          this.$refs['modal-CustomerDetail'].hide()
        })
        .catch((error) => {
          this.errorHandler(error)
        })
    },
    onDestroyCustomer (customer) {
      this.destroyCustomer(customer.id)
        .then((response) => {
          this.$refs['modal-CustomerDestroy'].hide()
          this.listCustomer()
        })
        .catch((error) => {
          this.errorHandler(error)
        })
    },
    onPaginateCustomer (page) {
      this.queryCustomer.page = page
      this.listCustomer()
    },
    onFilterCustomer (query) {
      this.queryCustomer.name = query.name
      this.queryCustomer.customer_number = query.customer_number
      this.$refs['modal-CustomerFilter'].hide()
      this.customer = undefined
      this.listCustomer()
    },
    onExportCustomer () {
      this.exportCustomer()
    }
  },
  mounted () {
    this.httpInit()
    this.listCustomer()
      .catch((error) => {
        this.errorHandler(error)
      })
  }
}
</script>

<style>

</style>
