import adminRoutes from './admin'
import homeRoutes from './home'

let routes = [
  adminRoutes,
  homeRoutes,
]


function handleIndexRoute(route) {
  if(!route.childRoutes || !route.childRoutes.length) return
}

routes.forEach(handleIndexRoute)

export default routes