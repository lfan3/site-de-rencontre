import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Modal from '@material-ui/core/Modal';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import {DropFile} from '../components/DropFile';



const tileData = [
    {
        img : '/public/images/alice.png',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        img : '/public/images/cloebig.jpg',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        img : '/public/images/gille.jpg',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        img : '/public/images/alice.png',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        img : '/public/images/cloebig.jpg',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        img : '/public/images/gille.jpg',
        title : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
]

const galleryStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    gridListTile:{
        objectFit: 'cover'
    },
    paper: {
      position: 'absolute',
      width: '510px',
      heigth: '900px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      alignItems:'center'
    },
    arrows:{
      display:'flex',
      justifyContent:'space-between',
      width:'120px',
      margin:'auto'
    },
    closeBtn:{
      backgroundColor: 'ghostwhite',
   
    },
    titleBar:{
      background:'none',
      margin:'0.5em'
    },
    btn:{
      margin: '0.5em',
      width: '30%',
      position: 'absolute',
      right: '1em'
    }

  }));


  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: 'translate(-250px, -350px)'
    };
  }


//todo click and show the whol page
export function UserPhotosGallery({edit = false}){
    const [open, setOpen] = React.useState(false);
    const [photoIndex, setPhotoIndex] = React.useState(0);
    const [photos, setPhotos] = React.useState(tileData);
    const classes = galleryStyle();
    const [modalStyle] = React.useState(getModalStyle);
    const photoLen = photos.length;

    const handleOpen = (event, index)=>{
      setPhotoIndex(index);
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    };

    const nextPhoto = ()=>{
      if(photoIndex < photoLen - 1)
        setPhotoIndex(photoIndex => photoIndex + 1)
    }

    const prevPhoto = ()=>{
      if(photoIndex > 0)
        setPhotoIndex(photoIndex => photoIndex - 1)
    }

    const deletePhoto = (e, index)=>{
      setPhotos(photos=>photos.filter((p,i)=>i !== index));
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <img src={photos[photoIndex].img} />
     
        <div className={classes.arrows}>
          <IconButton onClick={prevPhoto}>
            <ArrowBackIosIcon fontSize='large' color='primary' />
          </IconButton>
          <IconButton onClick={nextPhoto}>
            <ArrowForwardIosIcon fontSize='large' color='primary' />
          </IconButton>
        </div>
      </div>
    );
    return (
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={3} cellHeight='315'>
            {photos.map((tile, index) => (
              <GridListTile key={index} className={classes.gridListTile} >
                  <img src={tile.img}  alt={tile.title} onClick={(e)=>handleOpen(e, index)}/>
                  {
                    edit && (
                      <GridListTileBar
                        titlePosition="top"
                        actionIcon={
                          <IconButton aria-label={`close`} className={classes.closeBtn} color='primary' onClick={(e)=>deletePhoto(e,index)}>
                            <CloseIcon fontSize='large'/>
                          </IconButton>
                        }
                        actionPosition="right"
                        className={classes.titleBar}
                      />
                    )
                  }
              </GridListTile>
            ))}
          </GridList>
          <DropFile/>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      );
}