import {createSlice} from '@reduxjs/toolkit' ;

const themeSlice = createSlice({
    name : "Theme" , 
    initialState : {
        value:"Dark",
        isDark:false
    } , 
    reducers : {
        setText : (state,actions) => {
            state.value = actions.payload; 
        },
        setTheme:(state,actions)=>{
            state.isDark = actions.payload;
       } 
    }, 
}) ;

export const {setText,setTheme} = themeSlice.actions;
export default themeSlice.reducer;