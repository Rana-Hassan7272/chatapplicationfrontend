// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../libs/FileFormat";
import { NEW_MESSAGE_ALERT } from "../../constants/event";


const initialState = {
  countNotification:0,
  newMessagesAlert:getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true}) || [
    {
      chatId:"",
      count:0
    }
  ]
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.countNotification =state.countNotification +1
     // Disable loader after user is loaded
    },
    resetNotification: (state) => {
        state.countNotification=0
    },
    countNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessagesAlert.findIndex(alert => alert.chatId === chatId);
    
      if (index !== -1) {
        // Increment the count if chatId already exists in newMessageAlert
        state.newMessagesAlert[index].count += 1;
      } else {
        // Otherwise, add a new entry for this chatId
        state.newMessagesAlert.push({
          chatId,
          count: 1
        });
      }
    },
    
  removeMessageAlert:(state,action)=>{
 
  state.newMessagesAlert.filter(alert => alert.chatId === action.payload);
  }
  },
});

export const {incrementNotification,resetNotification,countNewMessageAlert,removeMessageAlert} = chat.actions;

// **Change this line**
export default chat;
