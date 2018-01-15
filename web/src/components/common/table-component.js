import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SortingComponent from '../common/sorting-component';

class TableComponent extends Component {
    //on row select
    onSelecting($key) {
        if (this.props.onSelecting) {
            this.props.onSelecting($key);
        }
    }
    //on row delete
    onDeleting($key) {
        if (this.props.onDeleting) {
            this.props.onDeleting($key);
        }
    }
    //returns table headers
    getTableHeaders(table) {
        return _.map(table, (value, key) =>
            <th key={key}>
                <SortingComponent
                    field={value.field}
                    text={value.text}
                    isSort={value.isSort}
                    sort={this.props.sort}
                    order={this.props.order}
                    onSorting={this.props.onSorting} />
            </th>)
    }
    //returns table rows
    getTableRows(payload, table) {
        return _.map(payload, (value, key) =>
            <tr key={key}>
                {_.map(table, (v, k) => {
                    let text = value[v.field];
                    //checks if value is classified as a boolean primitive or object
                    let isBool = _.isBoolean(text);
                    if (isBool) {
                        text = text
                            ? (<i className="fa fa-check" aria-hidden="true"></i>)
                            : (<i className="fa fa-times" aria-hidden="true"></i>)
                    }
                    //edit row
                    if (v.isEdit) {
                        text = (<i className="fa fa-pencil-square-o cursor" aria-hidden="true"
                            onClick={(e) => { this.onSelecting(value.$key) }} title="Edit"></i>)
                    }
                    //delete row
                    if (v.isDelete) {
                        text = (<i className="fa fa-trash-o cursor" aria-hidden="true"
                            onClick={(e) => { this.onDeleting(value.$key) }} title="Delete"></i>)
                    }

                    return <td key={k}>{text}</td>
                })}
            </tr>)
    }
    render() {
        const { payload, table } = this.props;
        //table headers
        const headers = table ? this.getTableHeaders(table) : null;
        //table rows
        const rows = payload ? this.getTableRows(payload, table) : null;
        return (
            <table className="table table-striped">
                <thead><tr>{headers}</tr></thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

TableComponent.PropTypes = {
    payload: PropTypes.object.isRequired,
    table: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    onSorting: PropTypes.func,
    onSelecting: PropTypes.func,
    onDeleting: PropTypes.func
}

export default TableComponent;