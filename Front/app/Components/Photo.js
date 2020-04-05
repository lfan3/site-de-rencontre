import React from 'react'
import {Router, Link} from 'react-router-dom'
import {FaBowlingBall, FaTimesCircle, FaImage, FaImages} from 'react-icons/fa'
import { API_URL } from '../config'

function WaitingBall(){
    return(
        <div>
            <FaBowlingBall className='blue-gray' size = '5em'/>
        </div>
    )
}
//!!!???
function Images(props){
    return(
        <div>
        {
            props.images.map((image, index)=>(
            <div key = {index}>
                    <div
                        onClick = {()=>props.removeImage(image.public_id)}
                        className = 'delete'
                    >
                        <FaTimesCircle size='2em'className='blue-gray'/>
                    </div>
                    <img src = {image.secure_url} alt = 'camera'/>
            </div>
            ))
        }
        </div>
    )
}


function Buttons(props){
    return(
    <div className='buttons'>
        <div className='button'>
            <label htmlFor='single'>
                <FaImage className='light-blue' size='10em'/>
            </label>
            <input type='file' id='single' onChange = {props.onChange}/>
        </div>
        <div className='button'>
            <label htmlFor='multi'>
                <FaImages className='light-blue' size='10em'/>
            </label>
            <input type='file' id='multi' onChange = {props.onChange} multiple/>
        </div>
    </div>
    )
}
//it is worth to memorize this schema
export default class Photo extends React.Component{
    state = {
        uploading : false,
        images : []
    }
    componentDidMount(){
        //fetch all datas

    }
    onChange = (e)=>{
        //get files
        //the e.target.filles contain the image name, type and size
        //original data :{name: "camera (1).png", ... size: 2627, …}
        //array.from make it contain in an array like [{name:'camara' ...}]
        //the formData.value() = original data == an object
        const files = Array.from(e.target.files)
        this.setState({uploading : true})
        
        const formData = new FormData()
        files.forEach((file, index)=>{
            formData.append(index, file)
        })
        
        fetch(`${API_URL}/image-upload`, {
            method : 'POST',
            body : formData
        })
        .then(res => res.json())
        //?? how to get images not clear?
        .then(images => {
            this.setState({
                uploading : false,
                images : images
            })
        })
    }
    //this filter image'utilisation, you have seen many times
    removeImage = (id)=>{
        this.setState({
            images : this.state.images.filter((image) => image.public_id !== id)
        })
    }
    render(){
        const { uploading, images } = this.state
                    console.log(images)
        const content = ()=>{
            switch (true) {
                case uploading:
                    return <WaitingBall />
                case images.length > 0:
                    return (
                        <div>
                            <Images images = {images} removeImage={this.removeImage}/>
                            <Buttons onChange={this.onChange}/>
                        </div>)
                default:
                    return <Buttons onChange={this.onChange}/>
            }
        }
        return(
            <div>
                {content()}
            </div>
 
        )
    }
}