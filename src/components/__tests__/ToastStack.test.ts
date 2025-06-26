import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastStack from '@/components/ToastStack.vue'

const mockToasts = [
  { id: 1, message: 'Erro ao salvar' },
  { id: 2, message: 'Erro ao deletar' },
]

describe('ToastStack.vue', () => {
  it('não renderiza nenhum toast se lista estiver vazia', () => {
    const wrapper = mount(ToastStack, {
      props: {
        toasts: [],
      },
    })

    const toastElements = wrapper.findAll('[data-test="toast"]')
    expect(toastElements.length).toBe(0)
  })

  it('renderiza um único toast corretamente', () => {
    const wrapper = mount(ToastStack, {
      props: {
        toasts: [mockToasts[0]],
      },
    })

    const toast = wrapper.findAll('[data-test="toast"]')
    expect(toast.length).toBe(1)
    expect(toast[0].exists()).toBe(true)
    expect(toast[0].text()).toContain('Erro ao salvar')
  })

  it('renderiza múltiplos toasts corretamente', () => {
    const wrapper = mount(ToastStack, {
      props: {
        toasts: mockToasts,
      },
    })

    const toasts = wrapper.findAll('[data-test="toast"]')
    expect(toasts.length).toBe(2)
    expect(toasts[0].text()).toContain('Erro ao salvar')
    expect(toasts[1].text()).toContain('Erro ao deletar')
  })
})
