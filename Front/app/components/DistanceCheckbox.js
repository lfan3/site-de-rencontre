import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';


export function DistanceCheckbox() {
    const [checked, setChecked] = React.useState(true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  
    return (
      <div>

        <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color='primary'
          />
        }
        label="over 200km"
        />
        </div>
    )
}