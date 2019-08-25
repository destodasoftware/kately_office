const ROOT_API = `${process.env.ROOT_API}`
const APP = `shippings`
const ENDPOINT = `${ROOT_API}/office/${APP}/`

export default {
  data () {
    return {
      shipments: [],
      shipment: undefined,
      paginationShipment: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryShipment: {
        page: 1,
        sale: ''
      }
    }
  },
  methods: {
    listShipment () {
      return this.axios.get(ENDPOINT, {params: this.queryShipment})
        .then((response) => {
          this.shipments = response.data.results
          this.paginationShipment.next = response.data.next
          this.paginationShipment.previous = response.data.previous
          this.paginationShipment.count = response.data.count
        })
    },
    retrieveShipment (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.shipment = response.data
        })
    },
    updateShipment (id) {
      return this.axios.put(`${ENDPOINT}${id}/`, this.shipment)
        .then((response) => {
          this.shipment = response.data
        })
    },
    createShipment () {
      return this.axios.post(ENDPOINT, this.shipment)
        .then((response) => {
          this.shipment = response.data
        })
    },
    destroyShipment (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.shipment = undefined
        })
    },
    exportShipment () {
      const filename = `${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.queryShipment
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
