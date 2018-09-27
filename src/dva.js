import { message } from 'antd'

import debounce from 'lodash/debounce'

export function config() {
  return {
    onError: debounce(function(err, dispatch) {
      message.error(err.message)
    }, 200)
  }
}
