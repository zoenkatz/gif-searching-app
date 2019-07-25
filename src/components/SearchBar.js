import React, {useState, useContext} from 'react';
import ImagesContext from '../ImagesContext';
import {DebounceInput} from 'react-debounce-input';

export default function SearchBar() {
    const [queryInput, setQueryInput] = useState("");
    const {dispatch} = useContext(ImagesContext);


    const searchImages = (event) => {
        //set query input on state
        setQueryInput(event.target.value);
        dispatch({type: "SET_QUERY", payload: event.target.value});
    };

    return (
        <div className="search-bar">
            <div className="search-lining">
                <h2>Image Gallery</h2>
                <DebounceInput type="search"
                               list="last-queries"
                               placeholder="Search for images..."
                               id="image-search"
                               name="q"
                               onFocus={(event) => event.target.placeholder = ""}
                               onBlur={(event) => event.target.placeholder = "Search for images..."}
                               value={queryInput}
                               minLength={1}
                               debounceTimeout={300}
                               onChange={(event) => {
                                   searchImages(event);
                               }}

                />
                <datalist id="last-queries">
                    {localStorage.getItem('queries') && Object.values(JSON.parse(localStorage.getItem('queries'))).reverse().map((query, index) => {
                        return (
                            <option key={index} value={query}/>
                        )
                    })}
                </datalist>
            </div>
        </div>
    )
}
