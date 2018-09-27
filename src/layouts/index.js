import PropTypes from 'prop-types'
import OpenPageLayout from './OpenPageLayout'

export default function Layout({ location, route, children }) {
  return <OpenPageLayout>{children}</OpenPageLayout>
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  route: PropTypes.any,
  children: PropTypes.any
}
