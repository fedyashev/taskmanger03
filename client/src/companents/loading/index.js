import React from "react";

const Loading = () => (
<div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
    Loading
  </div>
</div>
);

export default Loading;