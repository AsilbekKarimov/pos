import React, { Suspense } from "react";


const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
