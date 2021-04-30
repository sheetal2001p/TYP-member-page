import {createSlice} from '@reduxjs/toolkit' ;

const memberSlice = createSlice({
    name : "Member" , 
    initialState : {
         members:[]
    } , 
    reducers : {
        setValue : (state,actions) => {
            state.members = actions.payload;
        } 
    }, 
}) ;

export const {setValue} = memberSlice.actions;
export default memberSlice.reducer;