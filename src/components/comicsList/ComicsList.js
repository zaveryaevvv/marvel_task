import './comicsList.scss';
import { useState, useEffect } from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import useMarvelService from "../../services/MarvelService"
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ComicsList = () => {

    const {loading, error, getAllComics} = useMarvelService();
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsList, setComicsList] = useState([])

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        console.log(newComicsList);
        
        setNewItemLoading(false);
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset => offset + 9);
    }

    const renderItems = (arr) => {
        console.log('renderItems'); 

        return (
            <TransitionGroup 
            className="todo-list"
            component={null}>

            {arr.map((item, i) => {
                
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <CSSTransition
                key={i}
                timeout={500}
                classNames="item"
                >

                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
                </CSSTransition>
            )
            })}

            </TransitionGroup>
        )
    }


    const items = renderItems(comicsList)
    const errorElement = error ? <ErrorMessage/> : null;
    const loadingElement = loading && !newItemLoading ? <Spinner/> : null;

    
    return (
        <div className="comics__list">
            <ul className="comics__grid">

            {items}
            {errorElement}
            {loadingElement}

            </ul>
            <button className="button button__main button__long">
                <div className="inner" onClick={() => onRequest(offset, false)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;