import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const StatusSelect = ({ label, value, onChange, options, sx }) => {
  return (
    <FormControl variant="outlined" sx={sx}>
      <InputLabel id="status-select-label">{label}</InputLabel>
      <Select
        labelId="status-select-label"
        label={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
