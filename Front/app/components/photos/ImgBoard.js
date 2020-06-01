import ReactCrop from 'react-image-crop'
import React, {useRef,useState,useEffect} from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { API_URL } from '../../config'
import Checkbox from '../filterBar/Checkbox'

//utilities functions
const cropToCanvas = (canvasRef, image64, cropPercent)=>{
	const canvas = canvasRef.current
	const ctx = canvas.getContext('2d')
	const image = new Image()
	image.src = image64
	let iwidth = cropPercent.width * image.naturalWidth * 0.01
	let iheight = cropPercent.height * image.naturalHeight * 0.01
	let ix = cropPercent.x * image.naturalWidth *0.01
	let iy = cropPercent.y * image.naturalHeight * 0.01

	image.onload = function(){
		ctx.drawImage(
			image,
			ix,
			iy,
			iwidth,
			iheight,
			0,
			0,
			400,
			400
		)
	}
}

const ImgBoardHeader = (props)=>{
	const closeHandler = props.closeHandler
	return(
		<div className='row h-10 justify-content-between align-item-center'>
			<div style = {{margin : '20px'}}>
			Edit Photo
			</div>
			<div style = {{margin : '10px'}}>
				<FontAwesomeIcon 
				icon={faTimes} 
				size= "lg"
				style={{color:'black'}}
				onClick = {closeHandler} />
			</div>
		</div>
	)
}

const ImgBody = (props)=>{
	const {canvas, canvasDisplay, imgSrc, crop, handleOnCropComplet, crophandler} = props
	return(
		<div className='row h-80 gray justify-content-center module flex-nowrap'>
			<canvas height='400px' width='400px' ref={canvas} style={{display: canvasDisplay}}/>
			{canvasDisplay === 'none' &&
			<ReactCrop 
			src={imgSrc}
			crop={crop} 
			minWidth = {200}
			maxWidth = {400}
			onComplete = {handleOnCropComplet}
			onChange={crophandler}
			/>
			}
	</div>
	)
}

const ImgFoot = (props)=>{
	const {
        previewHandler, 
        redoHandler, 
        uploaded,
        canvasDisplay, 
        submitHandler,
        profile,
        checkProfile} = props

    return(
        //TODO: CHECKBOX AND API-DATABASE

		<div className='row h-9 justify-content-end' style = {{marginTop: '4px'}}>
			{uploaded && canvasDisplay === 'none' && <button className='btn  btn-primary btn-block' onClick={previewHandler}>Preview</button>}
			{canvasDisplay === 'block' && 
				<React.Fragment>
                    <label className='flex-row'>
                        <Checkbox checked = {profile} onChange={checkProfile} />
                        <span>make this photo my profile photo</span>
                    </label>
					<button className='btn btn-primary btn-block ' onClick = {submitHandler}>Submit</button>
					<button className = 'btn btn-warning btn-block' onClick = {redoHandler}>Redo</button>
				</React.Fragment>
			}
		</div>
	)
}
const ImgBoard = (props)=>{
	const {setUpLoad, filter, setImgSrc, pushImgArr} = props
    const canvas = useRef()
    const [profile, setProfile] = useState(false)

    const [uploaded, setUpLoaded] = useState(false)
    const [finalImg, setFinalImg] = useState('')
	const [canvasDisplay, setCanvasDisplay] = useState('none')
	const [crop, setCrop] = React.useState({ 
		unit : '%',
		aspect: 1,
		x :25,
		y : 25,
		width : 50,
		height: 50,
	});
	useEffect(()=>{
		if(props.imgSrc)
			setUpLoaded(true)
    }, [props.imgSrc])
    // ! third library events
    const crophandler = (crop)=>{
		setCrop(crop)
	}
	const handleOnCropComplet = (crop, percent)=>{
		cropToCanvas(canvas, props.imgSrc, percent)
    }
    // ! my events
    const checkProfile = ()=>{
        setProfile((profile)=>!profile)
    }
	const convertCanvasToData = (cb)=>{
        let image64 = canvas.current.toDataURL()
        let userA = localStorage.getItem('userId')
        if(profile)
            setProfile(1)
        else 
            setProfile(0)
        let data = {userA, image64, profile}
        cb()
        let options = {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        }
        fetch(`${API_URL}/uploadImg`, options)
        .then((res)=>res.json())
        .then((res)=>{
            pushImgArr({photo_path: res.imagePath, is_profile : profile})
        })
        //setFinalImg(image64)
    }
    const submitHandler = ()=>{
        convertCanvasToData(closeHandler)
    }
	const previewHandler = ()=>{
		setCanvasDisplay('block')
	}
	const redoHandler = ()=>{
		setCanvasDisplay('none')
	}
	const closeHandler = ()=>{
		setUpLoad(false)
		setImgSrc('')
		filter.current = 'blur(0px)'
    }
	return(
		<React.Fragment>
			<div 
            className = 'col-12'
            style={{
                border:'2px #EEEEEE solid', 
                height : '25em', 
                width : '30em',
                position: 'absolute', 
                top : '10em'}}>
				<ImgBoardHeader closeHandler = {closeHandler}/>
				<ImgBody 
					canvas = {canvas} 
					canvasDisplay = {canvasDisplay}
					imgSrc = {props.imgSrc}
					crop = {crop}
					handleOnCropComplet = {handleOnCropComplet}
					crophandler = {crophandler}
				/>
				<ImgFoot
					previewHandler = {previewHandler}
                    submitHandler = {submitHandler}
					redoHandler = {redoHandler} 
					uploaded = {uploaded}
					canvasDisplay = {canvasDisplay}
                    checkProfile = {checkProfile}
                    profile = {profile}
                    //convertCanvasToData = {convertCanvasToData}
				/>
			</div>
		</React.Fragment>
	)
}

export default ImgBoard