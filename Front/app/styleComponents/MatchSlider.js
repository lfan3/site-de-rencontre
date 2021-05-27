import {withStyles} from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';

export const MatchSlider = withStyles({
    root: {
      color: 'primary',
      height: 8,
      width: '100%',
      marginBottom: '1.5em'
    },
    thumb: {
      height: 18,
      width: 18,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: 0,
      marginLeft: -6,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50%)',
    },
 
    track: {
      height: 18,
      borderRadius: 25,
    },
    rail: {
      height: 18,
      borderRadius: 25,
    },
  })(Slider);