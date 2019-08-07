import Repository from './Repository'

const resource = '/saleitems'

export default {
  get (id) {
    return Repository.get(`${resource}/${id}/`)
  },
  all (query) {
    return Repository.get(`${resource}`, {params: query})
  },
  create (value) {
    return Repository.post(`${resource}/`, value)
  },
  update (id, value) {
    return Repository.put(`${resource}/${id}/`, value)
  },
  delete (id) {
    return Repository.delete(`${resource}/${id}/`)
  }
}
