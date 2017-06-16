import React from 'react';
import { Link } from 'react-router';

export default class BeersMenu extends React.Component {
  render() {
    return (
      <nav className="beers-menu">
        {this.props.beers.map(menuBeer => {
          return <Link key={menuBeer.id} to={`/beer/${menuBeer.id}`} activeClassName="active">
            {menuBeer.name}
          </Link>
        })}
      </nav>
    );
  }
}