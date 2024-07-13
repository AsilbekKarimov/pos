import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
(
  <Suspense className=""
    fallback={
      <div className="flex justify-center w-full h-screen items-center">
        <span className="loading loading-spinner loading-lg"></span>

      </div>

    }
  >
    <Component {...props} />
  </Suspense>
);

export default Loadable;
