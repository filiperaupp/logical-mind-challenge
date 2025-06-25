export interface ListResponseType<T> {
  result: T
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

export interface ItemResponseType<T> {
  result: T
}
