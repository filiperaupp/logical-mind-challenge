import type { ItemResponseType, ListResponseType } from '@/utils/response'

export type BaseService<TEntity, TForm, ListPaginateParams = Record<string, any>> = {
  getAllPaginate: (params: ListPaginateParams) => Promise<ListResponseType<TEntity[]>>
  getById: (id: number) => Promise<ItemResponseType<TEntity>>
  create: (data: TForm) => Promise<TEntity>
  update: (id: number, data: TForm) => Promise<TEntity>
  remove: (id: number) => Promise<void>
}
