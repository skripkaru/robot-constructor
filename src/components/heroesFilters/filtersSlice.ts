import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/useHttp";
import {IFilter} from "../../types";

const filtersAdapter = createEntityAdapter()

interface IInitialState {
  filters: IFilter[]
  filtersLoadingStatus: string
  activeFilter: string
}

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'success',
  activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters")
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilters.pending, state => {
        state.filtersLoadingStatus = 'loading'
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        filtersAdapter.setAll(state, action.payload)
        state.filtersLoadingStatus = 'success'
      })
      .addCase(fetchFilters.rejected, state => {
        state.filtersLoadingStatus = 'error'
      })
      .addDefaultCase(() => {
      })
  }
})

const {actions, reducer} = filtersSlice

export default reducer

// @ts-ignore
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export const {
  changeActiveFilter
} = actions
