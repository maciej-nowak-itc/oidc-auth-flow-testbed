import React from 'react';

const CorsBypass = ({ isChecked, onChange }) => {
  return (
    <div>
      <label>Need to bypass CORS?:</label>
      <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
    </div>
  );
};

export default CorsBypass;
