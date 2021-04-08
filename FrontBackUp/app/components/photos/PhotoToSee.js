import React, {useRef,useState,useEffect} from 'react'
import {Router, Link} from 'react-router-dom'
import styled from 'styled-components'
import Show from './Photo_tuto'
import './photos.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';

//newthing:
//filereader, canvas in react, URL.createObjectURL(file);
/* how to show the image without sending it to server
				let reader = new FileReader()
				reader.onload = function(){
					var dataURL = reader.result
					console.log(reader)
		>>>>>>>     setImgSrc(dataURL)
				}
				reader.readAsDataURL(file)

				let img = new Image()
				var objectUrl = URL.createObjectURL(file);
				img.onload = function(){
				console.log(this)(<img src=''>)
				if(this.width < 300 || this.height < 200)
					setError('The image should be at leat 200px * 200px')
				else{
					setImgChecker(true)
					console.log(`width: ${this.width}, height: ${this.height}`)
				}
		>>>>>>      setImgSrc(this.src)
				URL.revokeObjectURL(objectUrl)
			}
			img.src = objectUrl
*/
const HiddenInput = styled.input.attrs({ type: 'file' })`
  height: 1px;
  width: 0px;
  margin: -1px;
  background-color: red;
`
const DisplayImages = (props)=>{
	let image = useRef()
	useEffect(()=>{
		//console.log(image.current)
		//console.log(image.current.getBoundingClientRect())

	},[])
	return(
		<div className='row justify-content-center'>
			<div>
				<img src='app/public/images/cloe.jpg' ref={image}/>
			</div>
			{/*props.imgSrc !=='' && <ImgBoard {...props}/>*/}
			<Canvas/>
		</div>
	)
}

const cropToCanvas = (canvasRef, image64, pixelCrop)=>{
	const canvas = canvasRef.current
	console.log(pixelCrop)
	//canvas.height = pixelCrop.height *2
	//canvas.width = pixelCrop.width *2
	canvas.height = 500
	canvas.width =500

	const ctx = canvas.getContext('2d')
	const image = new Image()
	image.src = image64
	console.log('image nature width ',image.naturalWidth )
	console.log('image width ',image.width )

	image.onload = function(){
		console.log('i m drawing') 
		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			500,
			500
			//pixelCrop.width,
			//pixelCrop.height
		)
	}
}
const ImgBoard = (props)=>{
	//const img = useRef()
	const canvas = useRef()
	const newCanvas = useRef()
	const [pixelImg, setPixelImg] = useState()
	const [crop, setCrop] = React.useState({ aspect: 16 / 9 });
	const [preAjustedImg, setPreAjustedImg] = React.useState(null)
	const [coordi, setCoordi] = useState('')
	let {width, height} = props.imgInfo.current
	let dWidth = width >= height ? 400 : Math.round(400 * width / height)
	let dHeight = width <= height ? 400 : Math.round(400 * height / width)
	let upLeftCornerX = width <= height ? Math.round((400 - dWidth)/2) : 0

	useEffect(()=>{
		if(props.imgSrc !== ''){
			setCoordi(canvas.current.getBoundingClientRect())
			let ctx = canvas.current.getContext('2d')
			let image = new Image()
			image.onload = function(){
				ctx.drawImage(image, 0, 0, width, height, upLeftCornerX, 0, dWidth,dHeight)
			}
			image.src = props.imgSrc
		}

	},[props.imgSrc])
	const convertCanvasToData = ()=>{
		let dataURL = canvas.current.toDataURL()
		setPreAjustedImg(dataURL)
	}
	const crophandler = (crop)=>{
		setCrop(crop)
	}
	const handleOnCropComplet = (crop, pixelCrop)=>{
		console.log(crop, pixelCrop)
		cropToCanvas(newCanvas, preAjustedImg,pixelCrop )
	}
	return(
		<React.Fragment>
			<div className='row h-10'>Edit Photo</div>
			<div className='row h-80 justify-content-center module'>
				<div className='col-6'>
					<canvas height='400px' width='400px' ref={canvas} style={{border: '5px blue solid'}}/>
					<div className='module-inside'>inside</div>
				</div>
				<div className='col-2'>
					{/*<img src={props.imgSrc} ref={img}/>*/}
					<ReactCrop 
					src={preAjustedImg}
					crop={crop} 
					onComplete = {handleOnCropComplet}
					onChange={crophandler}/>
				</div>
			</div>

			<div className='row h-10'>
				<button onClick={convertCanvasToData}>Submit</button>
			</div>
			<div>
				<canvas ref={newCanvas} width='400px' height='400px'  style={{border: '5px blue solid'}}/>

			</div>

		</React.Fragment>
	)
}

const Canvas = ()=>{
	let canvas = useRef()
	//let image = useRef()

	useEffect(()=>{
		console.log(canvas.current)
		let ctx = canvas.current.getContext('2d')
		let image = new Image()
		image.onload = function(){
			ctx.drawImage(image, 0, 0, 500, 500, 0,0, 200,300)
		}
		image.src = 'app/public/images/cat.jpg'
   
	}, [])
	
	const getImgPosition = ()=>{

	}
   
	return(
		<div>
			<canvas ref={canvas} width={300} height={300} />
			{/*<img ref={image} src ='app/public/images/cat.jpg'/>*/}

		</div>
	)
}

const ControleBar = (props)=>{
	let {upload} = props
	return(
		<div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<div className='row'>
						<label htmlFor='file' className='col-6'>
						  <img src='/app/public/images/cameraColor.png'/>
						  <span><strong>Upload</strong></span>
						  <HiddenInput type='file' id='file' onChange={upload} onClick={props.setFilter}/>
						</label>
					</div>
				</div>
			</div>

			<div className='row justify-content-center'>
				<div className='col-6'></div>
			</div>
		</div>
	)
}

const Photos = ()=>{
	const [error, setError] = useState('')
	const [imgSrc, setImgSrc] = useState('')
	const filter = useRef('blur(0px)')
	const imgInfo = useRef({})

	const setFilter = (e)=>{
		filter.current = 'blur(8px)'
	}
/*
	const upload = (e)=>{
		const files = Array.from(e.target.files)
		console.log(files)
		let formData = new FormData()
		let acceptedFile = ['image/jpeg', 'image/jpg', 'image/png']
		files.forEach((file, index)=>{
			console.log(file)
			//console.log(`${file.name}`)
			setImgSrc(`app/public/images/${file.name}`)
			if(!acceptedFile.includes(file.type))
				setError('The image should be in jpeg, jpg or png format')
			else
				formData.append(index, file)

		})
	}
	*/
	const upload = (e)=>{
		let file = e.target.files[0]
		console.log(file)
		//check the type and size
		let acceptedFile = ['image/jpeg', 'image/jpg', 'image/png']
		if(!acceptedFile.includes(file.type))        
			setError('The image should be in jpeg, jpg or png format')
		else if(file.size < 1500)
			setError('The image is too small')
		else if(file.size > 20000000)
			setError('The image is too big')
		else{
			let img = new Image()
			var objectUrl = URL.createObjectURL(file);
			img.onload = function(){
				console.log(this)
				if(this.width < 200 || this.height < 200)
					setError('The image should be at leat 200px * 200px')
				else{
					console.log(this.src)
					let reader = new FileReader()
					reader.readAsDataURL(file)
					reader.onload = function(){
						let dataURL = reader.result
						//use base64 not URL object, becase we need to realease url object with URL_revokeObjUrl
						setImgSrc(dataURL)
					}
					//setImgSrc(this.src)
					imgInfo.current = {height : this.height, width : this.width}
					console.log(`width: ${this.width}, height: ${this.height}`)
				}
				URL.revokeObjectURL(objectUrl)
			}
			img.src = objectUrl
		}
	}

	return(
		<div className='container'>
			<div className='row' >
				<div className='col-7' style = {{filter : filter.current}}>
					<DisplayImages imgSrc = {imgSrc}/>
				</div>
				<div className='col-5'>
					<ControleBar upload={upload} setFilter={setFilter}/>
				</div>
			</div>
			<div className='photo-container row' style={{position: 'relative', top : '-20em'}}> 
			   <div className = 'col-12' style={{border:'2px red solid'}}>
					{error}
					<ImgBoard imgSrc ={imgSrc} imgInfo={imgInfo}/>
			   </div>
			</div>
	   
		</div>
	)
}

export default Photos