import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MatchSlider } from '../styleComponents/MatchSlider';

const sliderStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
      color: '#463757'
    },
}));

export function SimpleSlider(props) {
    const classes = sliderStyles();
    //const [value, setValue] = React.useState(props.range);
    const {min, max, step, value, handleSliderChange} = props;
    const title = props.title.toUpperCase()

    return (
      <div className={classes.root}>
        <Typography id="discrete-slider-custom" gutterBottom>
          {title}
        </Typography>
        <MatchSlider
          aria-labelledby="discrete-slider-custom"
          step={step}
          valueLabelDisplay="auto"
          value = {value}
          min = {min}
          max = {max}
          onChange = {handleSliderChange}
        />
      </div>
    );
  }