import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'
import BaseLoader from '@/components/BaseLoader.vue'

describe('BaseButton.vue', () => {
  it('renderiza o ícone corretamente', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
      },
    })

    const icon = wrapper.find('[data-test="button-icon"]')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('fa-check')
  })

  it('exibe o texto se a prop `text` for passada', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
        text: 'Salvar',
      },
    })

    expect(wrapper.text()).toContain('Salvar')
    const span = wrapper.find('[data-test="button-text"]')
    expect(span.exists()).toBe(true)
  })

  it('não exibe o texto se a prop `text` não for passada', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
      },
    })

    const span = wrapper.find('[data-test="button-text"]')
    expect(span.exists()).toBe(false)
  })

  it('renderiza o loader quando `isLoading` for true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
        isLoading: true,
      },
    })

    expect(wrapper.findComponent(BaseLoader).exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(false)
  })

  it('desativa o botão se `disabled` for true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
        disabled: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('desativa o botão se `isLoading` for true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: 'check',
        isLoading: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })
})
