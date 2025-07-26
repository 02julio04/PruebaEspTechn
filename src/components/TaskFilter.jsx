import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export default function TaskFilter({ filter, onChange }) {
  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={(e, newFilter) => {
        if (newFilter !== null) onChange(newFilter);
      }}
      fullWidth
      color="primary"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="completed">Done</ToggleButton>
      <ToggleButton value="pending">Pending</ToggleButton>
    </ToggleButtonGroup>
  );
}
