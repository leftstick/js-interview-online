import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import { routes } from '../../helpers/exam'

class Exam extends React.Component {
  static propTypes = {
    locationPathname: PropTypes.string,
    locationQuery: PropTypes.object
  }

  render() {
    const { locationPathname } = this.props
    const route = routes.find(r => r.path === locationPathname)
    console.log('locationPathname', route)
    return <div>{route.content}</div>
  }
}

export default connect(({ app }) => {
  return {
    locationPathname: app.locationPathname,
    locationQuery: app.locationQuery
  }
})(Exam)
