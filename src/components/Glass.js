import React from 'react';

export default class Glass extends React.Component {
  render() {
    return (
      <span className="glass">
        {this.props.name}
      </span>
    );
    }
}