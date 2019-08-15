export default {
  methods: {
    generateSKU (prefix) {
      let random = Math.floor(Math.random() * 1000)
      let data = new Date()
      if (prefix) {
        return `CDE-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
      }
      return `${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
