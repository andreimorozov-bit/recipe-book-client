import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
);

export const HomePage: React.FC = () => {
  return (
    <div>
      <Typography variant='h5'>HomePage</Typography>
    </div>
  );
};
