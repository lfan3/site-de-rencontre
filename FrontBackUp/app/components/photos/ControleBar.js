import React from 'react'
import HiddenInput from './HiddenInput'

const ControleBar = (props)=>{
	let {uploadHandler} = props
	return(
		<div>
			<div className='row justify-content-center'>
				<div className='col-4'>
					<div className='row'>
						<label htmlFor='file' className='col-6'>
						  <img src='public/images/cameraColor.png'/>
						  <span><strong>Upload</strong></span>
						  <HiddenInput type='file' id='file' onChange={uploadHandler} onClick={props.setFilter}/>
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

export default ControleBar