import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../common/constants';

class SortingComponent extends Component {
    onSorting(e, sort) {
        e.preventDefault();
        if (this.props.onSorting) {
            this.props.onSorting(sort);
        }
    }
    render() {
        const { field, text, isSort, sort, order } = this.props;
        //sort order arrow icon
        const icon = isSort ? sort === field &&
            (order === constants.DESC
                ? <i className="fa fa-caret-down icon-margin-left text-danger"
                    aria-hidden="true"></i>
                : <i className="fa fa-caret-up icon-margin-left text-danger"
                    aria-hidden="true"></i>) : null;

        return (
            <div>
                {isSort ? <a href="#" onClick={(e) => { this.onSorting(e, field) }}>{text}</a> : text}
                {icon}
            </div>
        );
    }
}

SortingComponent.PropTypes = {
    field: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isSort: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    onSorting: PropTypes.func.isRequired
}

export default SortingComponent;