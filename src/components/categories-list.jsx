import React from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../lib/prop-types';
import { addCategory, removeCategory, updateCategory } from '../lib/category-actions';
import Category from './category';

const CategoriesList = ({ categories, dispatch }) => (
  <div className="categories-list">
    <ul>
      {categories.map((category) => (
        <Category
          key={category.id}
          onRemove={() => dispatch(removeCategory(category))}
          {...category}
        />
      ))}
    </ul>
    <button
      className="add-category"
      onClick={() => dispatch(addCategory())}
    >
      <i className="fa fa-plus"></i>
    </button>
  </div>
);

CategoriesList.propTypes = propTypes.categories;

export default connect(({categories}) => ({categories}))(CategoriesList);
