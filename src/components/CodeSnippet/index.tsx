import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/duotoneLight'

export default React.memo(function({ height, value }: { height: number; value: string }) {
  console.count('ReadOnlyEditor')
  return (
    <Highlight {...defaultProps} code={value} language="javascript" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, width: '100%', height, marginBottom: 0, padding: '5px 5px 15px 5px' }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
})
