import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '@/components/BaseTable.vue'
import BaseLoader from '@/components/BaseLoader.vue'

describe('BaseTable.vue', () => {
  const columns = ['Nome', 'Email', 'Ações']

  it('renderiza os títulos das colunas corretamente', () => {
    const wrapper = mount(BaseTable, {
      props: {
        isLoading: false,
        columns,
      },
      slots: {
        'table-header': '<tr><th>Nome</th><th>Email</th><th>Ações</th></tr>',
      },
    })

    const tableColumnsTitles = wrapper.findAll('th')
    expect(tableColumnsTitles[0].text()).toBe('Nome')
    expect(tableColumnsTitles[1].text()).toBe('Email')
    expect(tableColumnsTitles[2].text()).toBe('Ações')
  })

  it('exibe o loader quando isLoading é true', () => {
    const wrapper = mount(BaseTable, {
      props: {
        isLoading: true,
        columns,
      },
    })

    const loaderComponent = wrapper.findComponent(BaseLoader)
    expect(loaderComponent.exists()).toBe(true)
  })

  it('renderiza o slot quando isLoading é false', () => {
    const wrapper = mount(BaseTable, {
      props: {
        isLoading: false,
        columns,
      },
      slots: {
        default: '<tr><td>Teste</td></tr>',
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(1)
    expect(rows[0].text()).toContain('Teste')

    const loaderComponent = wrapper.findComponent(BaseLoader)
    expect(loaderComponent.exists()).toBe(false)
  })

  it('não renderiza o slot quando isLoading é true', () => {
    const wrapper = mount(BaseTable, {
      props: {
        isLoading: true,
        columns,
      },
      slots: {
        default: '<tr><td>Teste</td></tr>',
      },
    })

    expect(wrapper.html()).not.toContain('Teste')
  })
})
