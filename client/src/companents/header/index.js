import React from "react";
import PropTypes from "prop-types";

const Header = ({title}) => (
  <nav className="navbar navbar-dark bg-dark rounded-bottom mb-2">
    <span className="navbar-brand">{title}</span>
  </nav>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;