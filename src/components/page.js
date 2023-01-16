import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import LoadingSpinner from "./loader";
import Modal from './modal';
import axios from "axios";
import Card from './card';
import Scroll from './scroll';
import './page.css';

function Page(){
    const [search, setSearch] = useState("")
    const [bookData, setBookData] = useState([])
    const [books, setBooks] = useState([]);
    const [countBooks, setCountBooks] = useState(0);
    const [countPag, setCountPag] = useState(31);
    const [loader, setLoader] = useState(false);

    useEffect(() => { 
      setLoader(true)
      axios.get('https://www.googleapis.com/books/v1/volumes?q=book'+'&key=AIzaSyBLdQQWJ4Wc-9p7SQMLyTvOr8D10B2sePw' + '&maxResults=30')
      .then(function(res){
        setBookData(res.data.items)
        setCountBooks(res.data.totalItems)
        setLoader(false)
        }
      )
      .catch(err => console.log(err))
    }, [])
    
    function getBooks(){
      axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + category + '&orderBy=' + sorting + '&key=AIzaSyBLdQQWJ4Wc-9p7SQMLyTvOr8D10B2sePw' + '&maxResults=30')
      .then(function(res){
        setBookData(res.data.items)
        setCountBooks(res.data.totalItems)
        setLoader(false)
        }
      )
      .catch(err => console.log(err))
    }

    function searchBook(e){
      if(e.key === 'Enter'){
        setLoader(true)
        setBooks([])
        getBooks()
      }
    }

    function addBooks(){
      setCountPag((countPag) => countPag + 30);
      console.log(countPag)
      if(search){
        console.log('seach exists')
        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + category + '&orderBy=' + sorting + '&key=AIzaSyBLdQQWJ4Wc-9p7SQMLyTvOr8D10B2sePw' + '&startIndex=' + countPag + '&maxResults=30')
        .then(res => setBooks(books.concat(<div className="main">{<Card book={res.data.items}/>}</div>)))
        .catch(err => console.log(err))
      }else{
        console.log('seach not exists')
        axios.get('https://www.googleapis.com/books/v1/volumes?q=book' + category + '&orderBy=' + sorting + '&key=AIzaSyBLdQQWJ4Wc-9p7SQMLyTvOr8D10B2sePw' + '&startIndex=' + countPag + '&maxResults=30')
        .then(res => setBooks(books.concat(<div className="main">{<Card book={res.data.items}/>}</div>)))
        .catch(err => console.log(err))
      }
    }

    const [category, setCategory] = useState('');
    const [sorting, setSorting] = useState('relevance');

    function handleSubmit(event){
      event.preventDefault();
      setLoader(true)
      getBooks();
    }

    return(
      <div className='page'>
        <div className="header">
          <p>Search for books</p>
          <div className="search">
            <input type='text' placeholder="Enter book name" value={search} onChange={e=>setSearch(e.target.value)} onKeyPress={searchBook}/>
            <button onClick={handleSubmit}>search</button>
          </div>
          <div className='params'>
            <span>
            <p>Categories: </p>
            <select onChange={val => {setCategory(val.target.value); setBooks([])}} onClick={handleSubmit}>
              <option value=":all">all</option>
              <option value=':subject:art'>art</option>
              <option value=':subject:biography'>biography</option>
              <option value=':subject:computers'>computers</option>
              <option value=':subject:history'>history</option>
              <option value=':subject:medical'>medical</option>
              <option value=':subject:poetry'>poetry</option>
            </select>
            </span>
            <span>
            <p>Sorting by: </p>
            <select onChange={val => {setSorting(val.target.value);setBooks([])}} onClick={handleSubmit}>
              <option value='relevance'>relevance</option>
              <option value='newest'>newest</option>
            </select>
            </span>
          </div>
        </div>

        <div className="found">Found {countBooks} results</div>

        <Router>
          <div className="main1" >
            {<Card book={bookData}/>}
          </div>
          {books}

          <Routes>
            <Route exact path="/" element={<Card/>} />
            <Route exact path="/modal" element={<Modal/>} />
          </Routes>
        </Router> 

        {loader ? <LoadingSpinner /> : ''}

        <div>
          <button className='more' onClick={addBooks}>More</button>
        </div>

        <Scroll/>
      </div>
    )   
}
export default Page