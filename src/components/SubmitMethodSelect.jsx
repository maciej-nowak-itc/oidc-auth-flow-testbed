import React from 'react';
import SubmitMethods from '../types/SubmitMethods';

const SubmitMethodSelect = ({ value, onChange }) => {
  return (
    <div>
      <label>Submit Method:</label>
      <select value={value} onChange={onChange}>
        <option value={SubmitMethods.GET}>GET</option>
        <option value={SubmitMethods.POST_URLENCODED}>POST + application/x-www-form-urlencoded</option>
        <option value={SubmitMethods.POST_MULTIPART}>POST + multipart/form-data</option>
      </select>
    </div>
  );
};

export default SubmitMethodSelect;
