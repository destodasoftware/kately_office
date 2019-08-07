import SaleItemRepository from './SaleItemRepository'

const repositories = {
  saleitems: SaleItemRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
