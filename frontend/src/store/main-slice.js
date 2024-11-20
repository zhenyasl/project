import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     isCreatePostVisible: false,
     isFiltered: false,
     filter : localStorage.getItem('searchFilter') || '',
//   statusMessage: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleCreatePostVisibility(state) {
      state.isCreatePostVisible = !state.isCreatePostVisible;
    },
    toggleSearchFilter(state) {
        state.isFiltered = !state.isFiltered;
    },
    setNewFilter(state, action){
        console.log(action.payload);
        state.filter = action.payload;
        localStorage.setItem('searchFilter', action.payload);
        console.log(state.filter);
    },
    // showStatusMessage(state, action) {
    //   state.statusMessage = {
    //     status: action.payload.status,
    //     title: action.payload.title,
    //     message: action.payload.message,
    //   };
    // },
  },
});

export const mainActions = mainSlice.actions;

export default mainSlice;