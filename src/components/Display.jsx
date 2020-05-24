import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Display.css'

export default class Display extends Component {
    static propTypes = {
        value: PropTypes.string,
    }

    render() {
        return (
            <div className="component-display">
                <div>{this.props.value}</div>
            </div>
        )
    }
}