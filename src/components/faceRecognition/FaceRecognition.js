import React from 'react';

const FaceRecognition = ({imageURL}) => {
    return (
    <div className='center'>
        <img alt='' src={imageURL}/>
    </div>
    )
}

export default FaceRecognition;