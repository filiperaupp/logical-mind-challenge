import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDialog from '@/components/BaseDialog.vue'
import BaseButton from '@/components/BaseButton.vue' // usado internamente

describe('BaseDialog.vue', () => {
  it('não renderiza quando `modelValue` é false', () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: false,
        title: 'Título do Modal',
      },
    })

    expect(wrapper.find('[data-test="dialog"]').exists()).toBe(false)
  })

  it('renderiza quando `modelValue` é true', () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Título do dialog',
      },
    })

    expect(wrapper.find('[data-test="dialog-background"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Título do dialog')
  })

  it('renderiza conteúdo do slot', () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Modal',
      },
      slots: {
        default: '<p>Conteúdo do modal</p>',
      },
    })

    expect(wrapper.html()).toContain('Conteúdo do modal')
  })

  it('emite `update:modelValue` com `false` ao clicar fora do modal', async () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Fechar modal',
      },
    })

    await wrapper.find('[data-test="dialog-background"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('não emite `update:modelValue` se clicar dentro do conteúdo', async () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Fechar modal',
      },
    })

    const content = wrapper.find('[data-test="dialog"]')
    await content.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('renderiza botão de fechar se `closeButton` for true', () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Com botão',
        closeButton: true,
      },
    })

    const closeBtn = wrapper.findComponent(BaseButton)
    expect(closeBtn.exists()).toBe(true)
  })

  it('emite `update:modelValue` com false ao clicar no botão de fechar', async () => {
    const wrapper = mount(BaseDialog, {
      props: {
        modelValue: true,
        title: 'Fechar',
        closeButton: true,
      },
    })

    const closeBtn = wrapper.findComponent(BaseButton)
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })
})
