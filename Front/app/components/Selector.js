import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash'

const selectorStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

/**
 * this is a general and reuseful Selector, we should defined the title and option items in the parent component
 * @param {*} props 
 * ex:  <Selector title='City' items = {['paris', 'londre']}/>
 */
export const Selector = (props)=>{
    const classes = selectorStyles()

    const [item, setItem] = React.useState('');
    const items = props.items;
    const title = props.title.toUpperCase();
    const handleChange = (event) => {
      setItem(event.target.value);
    };
   
    return(
        <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={item}
            onChange={handleChange}
          >
           <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {_.map(items, (each, index) =>{
                return(
                    <MenuItem value={each} key={index}>{each.toUpperCase()}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
      </div>
    )
}