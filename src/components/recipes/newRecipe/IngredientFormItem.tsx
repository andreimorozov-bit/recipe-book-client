import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Ingredient } from '../../../common/types';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    amount: {
      width: '5rem',
      '& input': {},
    },
    units: {
      margin: theme.spacing(1),
      minWidth: '80px',
    },
    name: {
      flexGrow: 1,
    },
    // select: {
    //   height: '40px',
    //   '& label': {
    //     transform: 'translate(40px, 40px)',
    //   },
    // },
    clearButton: {
      width: '35px',
      height: '35px',
      margin: '18px 0 0 0',
    },
    clearIcon: {
      padding: '0.5rem',
    },
  })
);

interface IngredientFormItemProps {
  ingredient: Ingredient;
  index: number;
  onAmountChange(event: React.ChangeEvent<any>, index: number): void;
  onUnitChange(event: React.ChangeEvent<any>, index: number): void;
  onIngredientChange(event: React.ChangeEvent<any>, index: number): void;
  onIngredientDelete(index: number): void;
}

export const IngredientFormItem: React.FC<IngredientFormItemProps> = ({
  ingredient,
  index,
  onAmountChange,
  onUnitChange,
  onIngredientChange,
  onIngredientDelete,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.root}>
      <TextField
        margin='dense'
        className={classes.amount}
        label='amount'
        value={ingredient.amount}
        onChange={(e) => onAmountChange(e, index)}
        variant='standard'
      />
      <FormControl variant='standard' className={classes.units}>
        <InputLabel margin='dense' id='units-label'>
          units
        </InputLabel>
        <Select
          labelId='units-label'
          id='dunits'
          margin='dense'
          value={ingredient.unit}
          onChange={(e) => onUnitChange(e, index)}
          label='Units'
        >
          <MenuItem value={'gram'}>gram</MenuItem>
          <MenuItem value={'ml'}>ml</MenuItem>
          <MenuItem value={'pcs'}>pcs</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.name}
        margin='dense'
        label='Ingredient'
        variant='standard'
        value={ingredient.name}
        onChange={(e) => onIngredientChange(e, index)}
      />
      <IconButton
        className={classes.clearButton}
        onClick={() => onIngredientDelete(index)}
      >
        <ClearIcon />
      </IconButton>
    </Grid>
  );
};
