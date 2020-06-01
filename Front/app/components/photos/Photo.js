import React, {useRef,useState,useEffect} from 'react'
import './photos.css'
import ControleBar from './ControleBar'
import DisplayImages from './DisplayImages'
import ImgBoard from './ImgBoard'
import { API_URL } from '../../config'
import Header from '../header/Header'

const Photos = ()=>{
	const [error, setError] = useState('')
	const [imgSrc, setImgSrc] = useState('')
	const [upload, setUpLoad] = useState(false)
	//*imgArr one part imagepath from userEffect, another part base64 image
	const [imgArr, setImgArr] = useState([])
	const filter = useRef('blur(0px)')
	const imgInfo = useRef({})
	const userA = localStorage.getItem('userId')
	useEffect(()=>{
		let options = {
			method : 'POST',
			headers : {"Content-Type" : "application/json"},
			body : JSON.stringify({userA}),
			credentials : 'include'
		}
		fetch(`${API_URL}/getPhotos`, options)
		.then((res)=>res.json())
		.then((res)=>{
			setImgArr(res)
			console.log(res)})
	},[])
	const setFilter = (e)=>{
		filter.current = 'blur(8px)'
	}
	const pushImgArr = (newImgdata)=>{
		setImgArr((imgArr)=>imgArr.concat(newImgdata))
	}
	const updateProfileImg = (imgPath)=>{
		let options = {
			method : 'POST',
			headers : {'Content-Type': 'application/json'},
			body : JSON.stringify({imgPath, userA}),
			credentials : 'include'
		}
		fetch(`${API_URL}/updateAvatar`, options)
		.then((res)=>res.json())
		.then((res)=>{
			setImgArr(res)
			console.log(res)})
	}
	const uploadHandler = (e)=>{
		let file = e.target.files[0]
		console.log('uploadhandler hier')
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
				if(this.width < 200 || this.height < 200)
					setError('The image should be at leat 200px * 200px')
				else{
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
			setUpLoad(true)
		}
	}
	return(
		<div className='container-fluid'>
			<Header userA = {userA}/>
			<div className='row' >
				<div className='col-9' style = {{filter : filter.current, border:'2px green solid'}}>
					<DisplayImages 
						imgArr = {imgArr}
						updateProfileImg = {updateProfileImg}
						/>
				</div>
				<div className='col-3'>
					<ControleBar uploadHandler={uploadHandler} setFilter={setFilter}/>
				</div>
			</div>
			<div className='photo-container row'> 
				{error}
			   {upload &&
					<ImgBoard 
						imgSrc ={imgSrc} 
						imgInfo={imgInfo} 
						setUpLoad={setUpLoad} 
						filter = {filter}
						setImgSrc = {setImgSrc}
						pushImgArr = {pushImgArr}
					/>
				}
			</div>
	   
		</div>
	)
}

export default Photos