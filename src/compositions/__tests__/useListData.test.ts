import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useListData } from '@/compositions/useListData'

describe('useListData', () => {
  const mockData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'João' },
  ]

  const getAllPaginate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('carrega dados corretamente com loadListData()', async () => {
    getAllPaginate.mockResolvedValue({
      result: mockData,
      meta: { totalPages: 3 },
    })

    const manager = useListData({ service: { getAllPaginate } })

    manager.loadListData(2)
    await flushPromises()

    expect(getAllPaginate).toHaveBeenCalledWith({ page: 2 })
    expect(manager.list.value).toEqual(mockData)
    expect(manager.pagination.totalPages).toBe(3)
    expect(manager.pagination.page).toBe(2)
  })

  it('isLoading é alterado corretamente durante loadListData()', async () => {
    getAllPaginate.mockResolvedValue({ result: [], meta: { totalPages: 1 } })

    const manager = useListData({ service: { getAllPaginate } })

    expect(manager.isLoading.value).toBe(false)

    manager.loadListData()
    expect(manager.isLoading.value).toBe(true)

    await flushPromises()
    expect(manager.isLoading.value).toBe(false)
  })

  it('atualiza selectedUser corretamente com upadteSelectedUser()', async () => {
    getAllPaginate.mockResolvedValue({ result: mockData, meta: { totalPages: 1 } })

    const manager = useListData({ service: { getAllPaginate } })
    manager.loadListData()
    await flushPromises()

    manager.upadteSelectedUser(2)
    expect(manager.selectedUser.value).toEqual({ id: 2, name: 'João' })
  })
})
