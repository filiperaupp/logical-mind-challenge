import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useRouteRedirect } from '@/compositions/useRouteRedirect'
import { useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('useRouteRedirect', () => {
  const pushMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as unknown as Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('deve redirecionar para a listagem', () => {
    const { goToList } = useRouteRedirect('users')
    goToList()

    expect(pushMock).toHaveBeenCalledWith('/users/list')
  })

  it('deve redirecionar para a tela de criação', () => {
    const { goToSaveScreen } = useRouteRedirect('users')
    goToSaveScreen()

    expect(pushMock).toHaveBeenCalledWith('/users/save')
  })

  it('deve redirecionar para a tela de edição com ID', () => {
    const { goToSaveScreen } = useRouteRedirect('orders')
    goToSaveScreen(42)

    expect(pushMock).toHaveBeenCalledWith('/orders/save/42')
  })
})
