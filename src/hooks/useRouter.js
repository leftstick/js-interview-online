import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router'
import { useMemo } from 'react'
import qs from 'qs'

function useRouter() {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  const exposedRouter = useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Example: /topic?sort=popular -> { sort: "popular" }
      query: qs.parse(location.search.startsWith('?') ? location.search.slice(1) : {}), // Convert string to object,
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
      params,
      updateQuery(query) {
        history.push({
          pathname: location.pathname,
          search: `?${qs.stringify(query)}`
        })
      }
    }
  }, [params, match, location, history])

  return exposedRouter
}

export { useRouter }
