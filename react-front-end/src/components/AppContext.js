import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'
export const ACTIONS = {
  TOGGLEMUTE: 'TOGGLEMUTE'
}

function reducer (state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLEMUTE:
      return {
        ...state, isMute: action.value
      }
  }
}

const initialState = {
  isMute: true
}

export const AppContext = createContext()

export function AppProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleMute = () => {
    dispatch({ type: ACTIONS.TOGGLEMUTE, value: !state.isMute })
  }

  return (
    <AppContext.Provider value={{ state, toggleMute }}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}
