import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputText from '@/components/forms/InputText.vue'

describe('InputText.vue', () => {
  it('renderiza o label corretamente', () => {
    const wrapper = mount(InputText, {
      props: {
        label: 'Nome de usuário',
        modelValue: '',
      },
    })

    expect(wrapper.find('label').text()).toBe('Nome de usuário')
  })

  it('exibe o valor passado via `modelValue` no input', () => {
    const wrapper = mount(InputText, {
      props: {
        label: 'Usuário',
        modelValue: 'Teste',
      },
    })

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('Teste')
  })

  it('emite `update:modelValue` ao digitar no input', async () => {
    const wrapper = mount(InputText, {
      props: {
        label: 'Usuário',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('testando')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['testando'])
  })

  it('exibe a mensagem de erro quando `errorMessage` é passada', () => {
    const wrapper = mount(InputText, {
      props: {
        label: 'Usuário',
        modelValue: '',
        errorMessage: 'Campo obrigatório',
      },
    })

    const error = wrapper.find('[data-test="input-error-message"]')
    expect(error.exists()).toBe(true)
    expect(error.text()).toBe('Campo obrigatório')
  })

  it('não exibe a mensagem de erro se `errorMessage` não for passada', () => {
    const wrapper = mount(InputText, {
      props: {
        label: 'Usuário',
        modelValue: '',
      },
    })

    expect(wrapper.find('[data-test="input-error-message"]').exists()).toBe(false)
  })
})
