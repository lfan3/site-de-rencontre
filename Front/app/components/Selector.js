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
    minWidth: 240,
  },
}));

/**
 * this is a general and reuseful Selector, we should defined the title and option items in the parent component
 * @param {*} props 
 * ex:  <Selector title='City' items = {['paris', 'londre']}/>
 */
export const Selector = React.memo((props)=>{
    const classes = selectorStyles()

    const items = props.items;
    const title = props.title.toUpperCase();
    const item = props.item;
    console.log(item)
    return(
        <div>
        <FormControl className={classes.formControl}>
          <InputLabel >{title}</InputLabel>
          <Select
            value={item}
            onChange={props.handleChange}
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
}, (prevProps, nextProps)=>{
  if(prevProps.item === nextProps.item)
    return true;
})