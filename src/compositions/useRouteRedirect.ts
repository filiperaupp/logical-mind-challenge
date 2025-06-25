import { useRouter } from 'vue-router'

export const useRouteRedirect = (resourceBasePath: string) => {
  const router = useRouter()

  const goToList = () => {
    router.push(`/${resourceBasePath}/list`)
  }

  const goToSaveScreen = (id?: number) => {
    id ? router.push(`/${resourceBasePath}/save/${id}`) : router.push(`/${resourceBasePath}/save`)
  }

  return {
    goToList,
    goToSaveScreen,
  }
}
