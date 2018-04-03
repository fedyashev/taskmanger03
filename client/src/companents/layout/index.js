import React from "react";

const Layout = ({children}) => (
  <div className="row justify-content-center">
    <div className="col-12">
      {children}
    </div>
  </div>
);

export default Layout;