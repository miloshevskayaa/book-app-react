import React from "react";
import { Link} from "react-router-dom";
import './card.css';

function Card({book}){
    return(
        <div className="cards">
            {
                book?.map((item) => {
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let categories = item.volumeInfo.categories && item.volumeInfo.categories[0];
                    categories = String(categories).split(' ')[0];
                    if(String(categories[categories.length-1]) === ','){
                        categories = categories.slice(0, -1);
                    }
                    let name = item.volumeInfo.title;
                    let author = item.volumeInfo.authors;
                    author = String(author).replace(/,/g, ", ");

                    return(
                        <div >
                            <Link to="/modal" state = {{ item : item }}>
                            <div className='card'>
                                <img src={thumbnail === 'undefined' ? '' : thumbnail} alt={name}></img>
                                <div className="info">
                                    <p className='categories'>{categories === 'undefined' ? '' : categories}</p>
                                    <p className='name'>{name}</p>
                                    <p className="authors">{author === 'undefined' ? '' : author}</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Card
