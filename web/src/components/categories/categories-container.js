import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import * as constants from '../../common/constants';
import * as categoriesActions from '../../actions/categories-actions';
import { toast } from 'react-toastify';
import LoadingComponent from '../common/loading-component';
import TableComponent from '../common/table-component';
import PagingComponent from '../common/paging-component';
import logo from '../../logo.svg';

class CategoriesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sort: 'updated', //default sort field
      order: constants.DESC, //default sort order
      page: 1, //page index
      size: 10 //no. of records on the page
    }
    this.onSorting = this.onSorting.bind(this);
    this.onPaging = this.onPaging.bind(this);
    this.onSelecting = this.onSelecting.bind(this);
    this.onDeleting = this.onDeleting.bind(this);
  }
  onSorting(sort) {
    let order = this.state.order === constants.DESC ? constants.ASC : constants.DESC;
    this.setState({ sort, order });
  }
  onPaging(page) {
    this.setState({ page });
  }
  onSelecting($key) {
    let path = `${constants.CATEGORIES_URL}/${$key}`;
    browserHistory.push(path);
  }
  onDeleting($key) {
    event.preventDefault();
    this.props.actions.deleteCategory($key);
    const toastmsg = (<div>
      <img src={logo} className="toast-logo" alt="logo" />
      <div className="toast-content">{this.props.crud.message}</div>
    </div>);
    if (this.props.crud.isSuccess) {
      const options = {
        autoClose: 3000,
        type: toast.TYPE.DEFAULT,
        position: toast.POSITION.BOTTOM_CENTER
      };
      toast(toastmsg, options);
    }
    this.props.actions.getCategories();
  }
  componentDidMount() {
    this.props.actions.getCategories();
  }
  render() {
    const { categories } = this.props;
    let index = 1;
    //initial data
    let payload = categories.payload;
    //sorted data
    payload = _.orderBy(payload, [this.state.sort], [this.state.order]);
    //payload with id
    payload = _.map(payload, o => _.extend({ id: index++ }, o));
    //paged data
    let startIndex = (this.state.page - 1) * this.state.size;
    let endIndex = Math.min(startIndex + this.state.size - 1, payload.length - 1);
    let data = payload.slice(startIndex, endIndex + 1);
    //table object
    let table = [{ field: 'id', text: '#', isSort: false },
    { field: 'name', text: 'Name', isSort: true },
    { field: 'active', text: 'Active', isSort: true },
    { field: 'updated', text: 'Date', isSort: true },
    { field: '$key', text: '', isSort: false, isEdit: true },
    { field: '$key', text: '', isSort: false, isDelete: true }];
    return (
      <div className="container">
        <h3 className="page-header">
          Categories
          <button onClick={() => this.onSelecting('new')}
            className="btn btn-primary btn-sm pull-right">Add</button>
        </h3>
        {categories.isLoading
          ? <LoadingComponent />
          : <div>
            <TableComponent
              payload={data}
              table={table}
              sort={this.state.sort}
              order={this.state.order}
              onSorting={this.onSorting}
              onSelecting={this.onSelecting}
              onDeleting={this.onDeleting} />
            <PagingComponent
              onPaging={this.onPaging}
              currentPage={this.state.page}
              pageSize={this.state.size}
              pagerSize={10}
              totalItems={payload.length} />
          </div>
        }
      </div>
    );
  }
}

CategoriesContainer.PropTypes = {
  categories: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    crud: state.crud
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
