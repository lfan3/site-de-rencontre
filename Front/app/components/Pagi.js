import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const pagiStyle = makeStyles((theme) => ({
    root: {
      width: "200px", //need to change when I added more pages
      margin: "auto",
      marginTop: '2em',
    },
}));

export function Pagi({handleChange, page}) {
   const classes = pagiStyle();

    return (
      <div className= {classes.root}>
        <Pagination count={2} page={page} onChange={handleChange} color='primary' size="large" />
      </div>
    );
}