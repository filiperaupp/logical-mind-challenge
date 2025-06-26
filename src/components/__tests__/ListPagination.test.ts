import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ListPagination from '@/components/ListPagination.vue'

describe('ListPagination.vue', () => {
  it('renderiza a quantidade correta de botões', () => {
    const wrapper = mount(ListPagination, {
      props: {
        modelValue: 1,
        pages: 5,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(5)
    expect(buttons[0].text()).toBe('1')
    expect(buttons[4].text()).toBe('5')
  })

  it('emite eventos ao clicar em uma nova página', async () => {
    const wrapper = mount(ListPagination, {
      props: {
        modelValue: 1,
        pages: 3,
      },
    })

    // página 3
    const button = wrapper.findAll('button')[2]
    await button.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])

    expect(wrapper.emitted('pageChange')).toBeTruthy()
    expect(wrapper.emitted('pageChange')![0]).toEqual([3])
  })

  it('não emite eventos ao clicar na página atual', async () => {
    const wrapper = mount(ListPagination, {
      props: {
        modelValue: 2,
        pages: 3,
      },
    })

    // página 2
    const currentButton = wrapper.findAll('button')[1]
    await currentButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('pageChange')).toBeFalsy()
  })
})
