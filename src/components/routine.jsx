import React from 'react'
import * as propTypes from '../lib/prop-types'

const Routine = ({ name }) => (
  <li>
    <h2>{name}</h2>
    Routine
  </li>
)

Routine.propTypes = propTypes.routine

export default Routine
