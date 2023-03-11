// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/')
    return navigateTo('/search')
})
