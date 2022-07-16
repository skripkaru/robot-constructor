import {createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/useHttp";

const heroesAdapter = createEntityAdapter()

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'success',
})

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/heroes")
  }
)

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    deleteHero: (state, action) => {
      heroesAdapter.removeOne(state, action.payload)
    },
    createHero: (state, action) => {
      heroesAdapter.addOne(state, action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        heroesAdapter.setAll(state, action.payload)
        state.heroesLoadingStatus = 'success'
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error'
      })
      .addDefaultCase(() => {
      })
  }
})

const {actions, reducer} = heroesSlice

export default reducer

// @ts-ignore
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    (state: { filters: { activeFilter: any; }; }) => state.filters.activeFilter,
  selectAll,
  (filter: any, heroes: any) => {
    if (filter === 'all') {
      return heroes
    } else {
      return heroes.filter((item: { element: any; }) => item.element === filter)
    }
  }
)

export const {
  deleteHero,
  createHero
} = actions
