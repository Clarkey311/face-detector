import React from 'react';
import '../../App.css';
import './imageLinkForm.css';

const ImageLinkForm = () => {
    return (
        <div>

            <p className='f3'>
                {'This Magic Brina will detect faces in you rpictures, give it a try!'}
            </p>
            <div className='center'> 
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;