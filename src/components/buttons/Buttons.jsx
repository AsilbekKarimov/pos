// src/ButtonGroup.js
import React, { useState } from "react";

let data = true;
function ButtonGroup() {
  // State to manage the visibility of buttons
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
