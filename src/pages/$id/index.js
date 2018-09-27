import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'umi/redirect'
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
    if (!route) {
      return (
        <Redirect
          to={{
            pathname: '/exam1'
          }}
        />
      )
    }

    const Content = route.content

    return (
      <div>
        <Content />
      </div>
    )
  }
}

export default connect(({ app }) => {
  return {
    locationPathname: app.locationPathname,
    locationQuery: app.locationQuery
  }
})(Exam)
