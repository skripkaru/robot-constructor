import {useHttp} from '../../hooks/useHttp';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TransitionGroup, CSSTransition} from "react-transition-group";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroList.scss'
import {deleteHero, fetchHeroes, filteredHeroesSelector} from "./heroesSlice";
import {IHero} from "../../types";
import {API_URL} from "../../constants";

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector)
  // @ts-ignore
  const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchHeroes());

  }, []);

  const onDelete = useCallback((id: string) => {
    request(`${API_URL}heroes/${id}`, 'DELETE')
      .then(() => dispatch(deleteHero(id)))
      .catch(e => console.log(e))
  }, [request])

  if (heroesLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>
  }

  const renderHeroesList = (arr: IHero[]) => {
    if (arr.length === 0) {
      return (
        <CSSTransition
          timeout={0}
          classNames="hero"
        >
          <h5 className="text-center mt-5">You don't have heroes</h5>
        </CSSTransition>
      )
    }

    return arr.map(({id, ...props}) => {

      return (
        <CSSTransition
          key={id}
          timeout={500}
          classNames="hero"
        >
          <HeroesListItem onDelete={() => onDelete(id)} id={id} {...props}/>
        </CSSTransition>
      )
    })
  }

  const elements = renderHeroesList(filteredHeroes);
  return (
    <TransitionGroup component="ul">
      {elements}
    </TransitionGroup>
  )
}

export default HeroesList;
