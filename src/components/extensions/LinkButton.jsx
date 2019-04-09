// credit: Beau Smith, https://stackoverflow.com/a/49439893
// adapted

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

export const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props
  return (
    <button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event, () => {
          history.push(to);
        })
      }}
      disabled={props.isSending}
      type={props.button}
      className='button'
    >
      {props.children}
    </button>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)