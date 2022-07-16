import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import store from "../../store";

import {changeActiveFilter, fetchFilters, selectAll} from "./filtersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  // @ts-ignore
  const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
  const filters = selectAll(store.getState())
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchFilters());
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner/>
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text fs-5">Filter by types</p>
        <div className="btn-group">
          {filters.map((item: any) =>
              <button
                key={item.name}
                id={item.name}
                className={`btn ${item.className} ${activeFilter === item.name ? 'active' : ''}`}
                onClick={() => dispatch(changeActiveFilter(item.name))}
              >
                {item.label}
              </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;
