import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
(
  <Suspense className=""
    fallback={
      <div className="flex justify-center w-full">
        <span className="loading loading-spinner loading-lg w-20"></span>

      </div>

    }
  >
    <Component {...props} />
  </Suspense>
);

export default Loadable;
