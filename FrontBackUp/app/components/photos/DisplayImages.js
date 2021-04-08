import React, {useRef,useState,useEffect} from 'react'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const DisplayImages = (props)=>{
	//todo: correct later: i let the original image sended to db, 
	//todo:cropper image just used as profile photo
	let image = useRef()
	const [images, setImages] = useState([])
	let {imgArr, updateProfileImg} = props
	//useEffect(()=>{
	//	setImages(imgArr)
	//	console.log('updata')
	//}, [imgArr])
	return(
		<div className='row justify-content-center'>
			<div>
			{
				imgArr.map((image, index)=>{
					//console.log(image)
					return(
						<div  key = {index}>
							<img src= {image.photo_path} height='400px' width='400px'/>
							{image.is_profile !== 1 
							? <button className='btn btn-primary'  onClick = {()=>updateProfileImg(image.photo_path)}>turn to avatar</button>
							:<FontAwesomeIcon icon={faStar} size = 'lg' style={{color : 'yellow'}}/>}
								
						</div>
				)}
				)
			//<img src='public/images/cloe.jpg' ref={image}/>
				
			}
			</div>
			{/*props.imgSrc !=='' && <ImgBoard {...props}/>*/}
		</div>
	)
}

export default DisplayImages