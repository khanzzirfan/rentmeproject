import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import * as constants from '../../common/constants';
import Category from '../../models/category';
import * as categoriesActions from '../../actions/categories-actions';
import LoadingComponent from '../common/loading-component';

class CategoryContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = new Category();
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    goBack() {
        browserHistory.push(constants.CATEGORIES_URL);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.addCategory(this.state);
    }
    getCategories($key, categories) {
        //initial data
        let payload = categories.payload;
        //filter payload with $key 
        let category = payload ? _.find(payload, o => o.$key === $key) : null;
        //set local state if filtered payload exists
        if (category) {
            this.setState({
                $key: $key,
                name: category.name,
                active: category.active
            });
        }
    }
    componentDidMount() {
        this.props.actions.getCategories();
        //use props
        const { categories, $key } = this.props;
        this.getCategories($key, categories);
    }
    componentWillReceiveProps(nextProps) {
        this.getCategories(nextProps.$key, nextProps.categories);
    }
    render() {
        const { categories, crud } = this.props;
        return (
            <div className="container">
                <h3 className="page-header">
                    Category
                    <button onClick={this.goBack}
                        className="btn btn-danger btn-sm pull-right">Back</button>
                </h3>
                {categories.isLoading
                    ? <LoadingComponent />
                    : <form onSubmit={this.handleSubmit}>
                        <div className="form-group form-group-1">
                            <label htmlFor="name" className="label-1">Name</label>
                            <input type="text" id="name" name="name"
                                className="form-control input-sm half"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                        <div className="has-success">
                            <div className="checkbox checkbox-1 abc-checkbox">
                                <input type="checkbox" id="active" name="active"
                                    checked={this.state.active}
                                    onChange={this.handleChange} />
                                <label htmlFor="active">Active</label>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" type="submit"
                            disabled={crud.isLoading}>Submit</button>
                    </form>
                }
            </div>
        );
    }
}

CategoryContainer.PropTypes = {
    categories: PropTypes.object.isRequired,
    $key: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories,
        crud: state.crud,
        $key: ownProps.params.$key
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
