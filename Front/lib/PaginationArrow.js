import React from 'react'
import { Icon } from 'semantic-ui-react'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const arrowStyles = makeStyles((theme) => ({
    root: {
      color: '#9d58db',
    },
}));

export const PaginationArrow= ({right}) => {
    const classes = arrowStyles();
    return(
        <div className= 'profile-page-arrow' >
            <Icon name='arrow alternate circle left' className={classes.root + ' big'}/>
            <Icon 
                name='arrow alternate circle right' 
                className={classes.root + ' big'}
                onClick = {right}
            />
        </div>
    )
}

