import React, { useState } from "react";

let data = true;
function ButtonGroup() {
  const [root, setRoot] = useState(data);
  
  return (
    <div>
      {root && (
        <div>
          <button>edit </button>
          <button> Delete</button>
          <button> Add</button>
        </div>
      )}
    </div>
  );
}

export default ButtonGroup;
