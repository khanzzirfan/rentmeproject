import React, { Component } from 'react';

class LoadingComponent extends Component {
    render() {
        return (
            <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}

export default LoadingComponent;