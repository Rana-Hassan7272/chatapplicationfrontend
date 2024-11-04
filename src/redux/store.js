import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import api from "./api/api"
import misc from "./misc"
import chat from "./api/chat"

const store=configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [misc.name]:misc.reducer,
        [chat.name]:chat.reducer,
        [api.reducerPath]:api.reducer,
    },
    middleware:(mid)=>[...mid(),api.middleware]
})

export default store