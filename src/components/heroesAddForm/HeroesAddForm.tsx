import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid} from 'uuid';

import {useHttp} from "../../hooks/useHttp";
import {createHero} from "../heroesList/heroesSlice";
import {selectAll} from "../heroesFilters/filtersSlice";
import store from "../../store";
import {IFilter} from "../../types";
import {API_URL} from "../../constants";

const HeroesAddForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [element, setElement] = useState('')
  // @ts-ignore
  const {filterLoadingStatus} = useSelector(state => state.filters)
  const filters = selectAll(store.getState())
  const dispatch = useDispatch()
  const {request} = useHttp()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const newHero = {
      id: uuid(),
      name,
      description,
      element
    }

    // @ts-ignore
    request(`${API_URL}heroes`, "POST", JSON.stringify(newHero))
      .then(() => dispatch(createHero(newHero)))
      .catch(e => console.log(e))

    setName('')
    setDescription('')
    setElement('')
  }

  const renderOptions = (filters: IFilter[], status: string) => {
    if (status === "loading") {
      return <option>Loading</option>
    } else if (status === "error") {
      return <option>Loading error</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({name, label}) => {
        if (name === 'all') return

        return <option key={name} value={name}>{label}</option>
      })
    }
  }


  return (
    <form className="border p-4 shadow-lg bg-white rounded" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-5">Name</label>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Enter name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-5">Description</label>
        <textarea
          onChange={e => setDescription(e.target.value)}
          value={description}
          name="text"
          className="form-control"
          id="text"
          placeholder="Enter description"
          style={{"height": '130px'}}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="element" className="form-label fs-5">Type</label>
        <select
          onChange={e => setElement(e.target.value)}
          value={element}
          className="form-select"
          id="element"
          name="element"
          required
        >
          <option>Select type</option>
          {/*@ts-ignore*/}
          {renderOptions(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  )
}

export default HeroesAddForm;
