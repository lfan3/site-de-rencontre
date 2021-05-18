import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Fab from '@material-ui/core/Fab';

const useStyle = makeStyles((theme)=>({
    iconsWrapper:{
        width:'120px',
        margin: 'auto',
        marginTop: '1em',
        display:'flex',
        justifyContent:'space-between',
        marginTop:'2em',
        marginBottom:'-1em'
    },
    heartIcon:{
        color: theme.palette.text.light,
        boxShadow: '0.5px 1px 6px #cfd8dc'
    },
    heartIconLiked:{
        color: theme.palette.secondary.main,
        boxShadow: '0.5px 1px 6px #cfd8dc',
    },
    cancelIcon:{
        color: theme.palette.text.light,
        boxShadow: '0.5px 1px 6px #cfd8dc'
    }
}))

//todo add selected effetc for heart icon
export const LikeOrDislike = ()=>{
    const [liked, setLiked] = React.useState(false);
    const classes = useStyle();
    const toggleHeartIcon = ()=>{
        if(liked)
            setLiked(false)
        else
            setLiked(true)
    }
    return(
        <div className={classes.iconsWrapper}>
        <IconButton aria-label="dislike"  className={classes.cancelIcon}>
            <ClearIcon fontSize='large'/>
        </IconButton>
        <IconButton aria-label="like" className={liked ? classes.heartIconLiked : classes.heartIcon } onClick={toggleHeartIcon}>
            <FavoriteIcon fontSize='large'/>
        </IconButton>
        </div>
    )
}
