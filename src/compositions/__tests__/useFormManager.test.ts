import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useRoute } from 'vue-router'
import { flushPromises, mount } from '@vue/test-utils'
import { useFormManager } from '@/compositions/useFormManager'
import { useRouteRedirect } from '@/compositions/useRouteRedirect'
import { useForm } from 'vee-validate'
import { defineComponent, watch } from 'vue'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}))

vi.mock('@/compositions/useRouteRedirect', () => ({
  useRouteRedirect: vi.fn(),
}))

describe('useFormManager', () => {
  const mockGoToList = vi.fn()
  const create = vi.fn().mockResolvedValue(undefined)
  const update = vi.fn().mockResolvedValue(undefined)
  const getById = vi.fn().mockResolvedValue({ result: { id: 1, firsName: 'Lucas' } })
  const formContext = useForm<{ name: string }>()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRoute as unknown as Mock).mockReturnValue({ params: {} })
    ;(useRouteRedirect as unknown as Mock).mockReturnValue({ goToList: mockGoToList })
  })

  it('retorna "Criar" como título quando não há id', () => {
    const manager = useFormManager({
      formContext,
      service: { create, update, getById },
      mapEntityToForm: (e) => e as { name: string },
      resourcePath: 'users',
    })

    expect(manager.title.value).toBe('Criar')
  })

  it('retorna "Editar" como título quando há id', () => {
    ;(useRoute as unknown as Mock).mockReturnValue({ params: { id: '1' } })

    const manager = useFormManager({
      formContext,
      service: { create, update, getById },
      mapEntityToForm: (e) => e as { name: string },
      resourcePath: 'users',
    })

    expect(manager.title.value).toBe('Editar')
  })

  it('executa loadData no mounted', async () => {
    ;(useRoute as unknown as Mock).mockReturnValue({ params: { id: '1' } })

    const TestComponent = defineComponent({
      setup() {
        useFormManager({
          formContext,
          service: { create, update, getById },
          mapEntityToForm: (e) => e,
          resourcePath: 'users',
        })
        return () => null
      },
    })

    mount(TestComponent)
    await flushPromises()

    expect(getById).toHaveBeenCalledWith(1)
  })

  it('redireciona se getById falhar', async () => {
    const errorService = {
      getById: vi.fn().mockRejectedValue(new Error('Fail')),
      create,
      update,
    }

    ;(useRoute as unknown as Mock).mockReturnValue({ params: { id: '1' } })

    const TestComponent = defineComponent({
      setup() {
        useFormManager({
          formContext,
          service: errorService,
          mapEntityToForm: (e) => e,
          resourcePath: 'users',
        })
        return () => null
      },
    })

    mount(TestComponent)
    await flushPromises()

    expect(errorService.getById).toHaveBeenCalled()
    expect(mockGoToList).toHaveBeenCalled()
  })

  it('chama create ao submeter sem id', async () => {
    ;(useRoute as unknown as Mock).mockReturnValue({ params: {} })

    const manager = useFormManager({
      formContext,
      service: { create, update, getById },
      mapEntityToForm: (e) => e as { name: string },
      resourcePath: 'users',
    })

    await manager.onSubmit()
    expect(create).toHaveBeenCalled()
  })

  it('chama update ao submeter com id', async () => {
    ;(useRoute as unknown as Mock).mockReturnValue({ params: { id: '5' } })

    const manager = useFormManager({
      formContext,
      service: { create, update, getById },
      mapEntityToForm: (e) => e as { name: string },
      resourcePath: 'users',
    })

    await manager.onSubmit()
    expect(update).toHaveBeenCalled()
  })

  it('ativa e desativa loadingAction corretamente', async () => {
    const manager = useFormManager({
      formContext,
      service: { create, update, getById },
      mapEntityToForm: (e) => e as { name: string },
      resourcePath: 'users',
    })

    const states: boolean[] = []
    const stop = watch(manager.isLoadingAction, (v) => states.push(v))
    await manager.onSubmit()
    stop()
    expect(states).toHaveLength(2)
    expect(states).toEqual([true, false])
  })
})
