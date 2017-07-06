import cs from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import * as propTypes from '../lib/prop-types'
import { pluckState } from '../lib/util'
import { addCategory, updateCategory } from '../lib/actions'
import Category from './category'

const CategoriesList = ({ categories, exercises, weights, dispatch }) => (
  <div
    className={cs('list categories-list', {
      'is-empty': !categories.length,
    })}
  >
    <ul>
      {categories.map((category) => (
        <Category
          key={category.id}
          exercises={exercises}
          weights={weights}
          onUpdate={(data) => dispatch(updateCategory(data))}
          {...category}
        />
      ))}
    </ul>
    <div className="empty-list">No Categories</div>
    <button className="add" onClick={() => dispatch(addCategory())}>
      <i className="fa fa-plus"></i>
    </button>
  </div>
)

CategoriesList.propTypes = propTypes.categories

export default connect(pluckState('categories', 'exercises', 'weights'))(CategoriesList)
