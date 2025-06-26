import { computed, onMounted, ref } from 'vue'
import { type FormContext } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useRouteRedirect } from './useRouteRedirect'
import type { BaseService } from '@/data/services/BaseService'

export function useFormManager<TForm extends Record<string, any>, TEntity>(opts: {
  formContext: FormContext<TForm>
  service: Pick<BaseService<TEntity, TForm>, 'getById' | 'create' | 'update'>
  mapEntityToForm: (entity: TEntity) => TForm
  resourcePath: string
}) {
  const { formContext, service, resourcePath, mapEntityToForm } = opts

  const { goToList } = useRouteRedirect(resourcePath)
  const route = useRoute()
  const id = Number(route.params.id)

  const isLoadingData = ref(false)
  const isLoadingAction = ref(false)

  const title = computed(() => (id ? 'Editar' : 'Criar'))

  const loadData = async () => {
    if (!service.getById || !id) return

    isLoadingData.value = true
    service
      .getById(id)
      .then(({ result }) => {
        const formData = mapEntityToForm(result)
        formContext.setValues(formData as any)
      })
      .catch(() => {
        goToList()
      })
      .finally(() => {
        isLoadingData.value = false
      })
  }

  const onSubmit = formContext.handleSubmit(async (values) => {
    const save = id ? service.update?.(id, values) : service.create?.(values)

    if (!save) return

    isLoadingAction.value = true
    save
      .then(() => {
        goToList()
      })
      .finally(() => {
        isLoadingAction.value = false
      })
  })

  onMounted(() => {
    if (id) loadData()
  })

  return {
    title,
    isLoadingData,
    isLoadingAction,
    onSubmit,
    goToList,
  }
}
