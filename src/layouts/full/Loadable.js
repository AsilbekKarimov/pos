import React, { Suspense } from "react";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  return React.memo(LoadableComponent);
};

export default Loadable;
