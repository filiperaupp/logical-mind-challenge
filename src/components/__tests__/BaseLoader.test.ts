import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLoader from '@/components/BaseLoader.vue'

describe('BaseLoader.vue', () => {
  it('exibe o texto "Carregando dados..." quando withText é true (default)', () => {
    const wrapper = mount(BaseLoader)

    const text = wrapper.find('[data-test="loader-text"]')
    expect(text.exists()).toBe(true)
    expect(text.text()).toBe('Carregando dados...')
  })

  it('não renderiza o texto quando withText é false', () => {
    const wrapper = mount(BaseLoader, {
      props: {
        withText: false,
      },
    })

    expect(wrapper.find('[data-test="loader-text"').exists()).toBe(false)
  })
})
