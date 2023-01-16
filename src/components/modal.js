import React from "react";
import { Link  } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import './modal.css'

function Modal(){
    const location = useLocation()
    let { item } = location.state;
    console.log(item)

    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    let categories = item.volumeInfo.categories && item.volumeInfo.categories[0];
    let discription = item.volumeInfo.description;

    return(
        <div className='allShow'>
            <Link to="/" className='close'>close</Link>
            <div className="showBox">
                <div className='box'>
                    <img src={thumbnail} alt='no'></img>
                    <div className='info'>
                        <h3>{categories}</h3>
                        <h1>{item.volumeInfo.title}</h1>
                        <h3>{item.volumeInfo.subtitle}</h3>
                        <h2>{item.volumeInfo.authors}</h2>
                        <h3>{item.volumeInfo.publishedDate}</h3>
                    </div>
                </div>
                <h4>{discription}</h4>
            </div>
        </div>
    )
}

export default Modal

