import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputSelect from '@/components/forms/InputSelect.vue'

const mockOptions = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
]

describe('InputSelect.vue', () => {
  it('renderiza o label corretamente', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '',
        options: mockOptions,
      },
    })

    expect(wrapper.find('label').text()).toBe('Categoria')
  })

  it('renderiza todas as opções corretamente', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '',
        options: mockOptions,
      },
    })

    const options = wrapper.findAll('option')
    // +1 por causa da opção "Selecione uma opção"
    expect(options.length).toBe(mockOptions.length + 1)
    expect(options[1].text()).toBe('Opção 1')
    expect(options[2].attributes('value')).toBe('2')
  })

  it('seleciona a opção com base em `modelValue`', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '2',
        options: mockOptions,
      },
    })

    const select = wrapper.find('select').element as HTMLSelectElement
    expect(select.value).toBe('2')
  })

  it('emite `update:modelValue` ao trocar o valor', async () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '',
        options: mockOptions,
      },
    })

    const select = wrapper.find('select')
    await select.setValue('3')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['3'])
  })

  it('exibe a mensagem de erro quando `errorMessage` é passada', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '',
        options: mockOptions,
        errorMessage: 'Seleção obrigatória',
      },
    })

    const error = wrapper.find('[data-test="input-error-message"]')
    expect(error.exists()).toBe(true)
    expect(error.text()).toBe('Seleção obrigatória')
  })

  it('não exibe a mensagem de erro se `errorMessage` não for passada', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Categoria',
        modelValue: '',
        options: mockOptions,
      },
    })

    expect(wrapper.find('[data-test="input-error-message"]').exists()).toBe(false)
  })
})
