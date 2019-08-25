<template>
  <div v-if="sale" class="row">
    <div v-if="mySale" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Nomer Penjualan</label>
          <div class="text-primary">
            {{ mySale.sale_number }}
          </div>
        </div>
        <div class="form-group">
          <label>Total</label>
          <div class="text-primary">
            {{ mySale.total }}
          </div>
        </div>
        <div class="form-group">
          <label>PIC</label>
          <div class="text-primary">
            {{ mySale.pic }}
          </div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <div class="text-primary">
            {{ mySale.status }}
          </div>
        </div>
        <div class="form-group">
          <label>Tanggal</label>
          <div class="text-primary">
            {{ mySale.sale_date }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nomer Penjualan</label>
          <div class="text-primary">
            {{ mySale.sale_number }}
          </div>
        </div>
        <div class="form-group">
          <label>PIC</label>
          <div class="text-primary">
            {{ mySale.pic }}
          </div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select v-model="mySale.status" class="form-control">
            <option :value="'open'">Open</option>
            <option :value="'close'">Close</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tanggal</label>
          <vue-datepicker
            v-model="mySale.sale_date"
          />
        </div>
        <div class="form-group">
          <button
            @click="onUpdate"
            class="btn btn-primary"
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
  name: 'SaleDetail',
  props: {
    sale: Object
  },
  data () {
    return {
      mySale: undefined,
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
      this.onCancel()
      let myDate = this.mySale.sale_date
      this.mySale.sale_date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`
      this.$emit('onUpdate', this.mySale)
    }
  },
  watch: {
    sale (n, o) {
      this.mySale = n
    }
  },
  mounted () {
    this.mySale = this.sale
  }
}
</script>

<style>

</style>
