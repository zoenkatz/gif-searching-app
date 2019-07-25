import React, {useContext, useReducer, useEffect, useState} from 'react';
import './App.scss';
import ImagesContext from './ImagesContext';
import ImagesReducer from './ImagesReducer';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImagesBoard from './components/ImagesBoard';



function App() {

  const useApi = (endpoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
    }, [state.query]);

    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };

    return data;
  };

  const initialState = useContext(ImagesContext);
  const [state, dispatch] = useReducer(ImagesReducer, initialState);
  const savedImages = useApi(`https://api.giphy.com/v1/gifs/search?api_key=QJXcmtE6OjAqGoTfkw5tL65U2Juvn1aL&q=${state.query}`);

  useEffect(() => {

    dispatch({
      type: "GET_IMAGES",
      payload: savedImages
    });

  }, [savedImages]);

  return (
      <ImagesContext.Provider value={{state, dispatch}}>
        <div className="App">
          <SearchBar/>
          <ImagesBoard/>
        </div>
      </ImagesContext.Provider>
  )
}

export default App;
