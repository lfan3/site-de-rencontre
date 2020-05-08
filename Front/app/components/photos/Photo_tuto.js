import ReactCrop from 'react-image-crop'
import React from 'react'
function CropDemo({ src }) {
    const [crop, setCrop] = React.useState({ aspect: 16 / 9 });
    return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
}

function Show(){
    return(
        <CropDemo src = 'app/public/images/cat.jpg'/>
    )
}

export default CropDemo