import * as React from 'react';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Styled from "./styles"

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      <Box component="div" sx={{ width: '100%', mr: 1 }}>
        <Styled.BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box component="div" sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  progress: number;
}

export default function LinearWithValueLabel({ progress }: Props) {

  return (
    <Box component="div" sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}