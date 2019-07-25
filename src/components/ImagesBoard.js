import React, {useContext, useState, useEffect} from 'react';
import ImagesContext from '../ImagesContext';

export default function ImagesBoard(){
    const {state} = useContext(ImagesContext);
    const [currentPage, setCurrentPage] = useState(1);
    const queries = localStorage.getItem('queries') ?
        JSON.parse(localStorage.getItem('queries')) : localStorage.setItem(`queries`, JSON.stringify({}));

    const pageNumbers = [];
    const imagesPerPage = 5;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;

    for (let i = 1; i <= Math.ceil(state.images && state.images.length / imagesPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        //update current pagination to 1
        setCurrentPage(1);

        //Save search query if has saved images
        if(state.images && state.images.length && state.query) {
            queries[state.query] = state.query;
            localStorage.setItem(`queries`, JSON.stringify(queries));
        }

    }, [state.images]);

    return(
        <div className="images-board">
            {state.images && state.images.slice(indexOfFirstImage, indexOfLastImage).map((photo, index) => {
                return(
                    <img key={index}
                         src={`${photo.images["fixed_height_still"].url}`}
                         alt={photo.title}
                    />
                )
            })}
            <ul id="page-numbers">
                {pageNumbers.map(number => {
                    return (
                        <li key={number}>
                            <button id={number} className={number === currentPage ? 'button-current' : 'next-buttons' } onClick={(e) => setCurrentPage(Number(e.target.id))}>{number}</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
