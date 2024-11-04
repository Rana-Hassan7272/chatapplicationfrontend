import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup:false,
  isAddMember:false,
  isNotification:false,
  isMobile:false,
  isSearch:false,
  isDeleteMenu:false,
  isUploaderFile:false,
  isUploadLoader:false,
  isNewMessageAlert:false,
  isSelectDeleteChat:{
    chatId:"",
    groupChat:false
  }

};

const misc = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
      
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
      
    },
    setIsNewNotification: (state, action) => {
        state.isNotification = action.payload;
        
      },
      setIsNewMessageAlert: (state, action) => {
        state.isNewMessageAlert = action.payload;
        
      },
      setIsNewGroup: (state, action) => {
        state.isNewGroup = action.payload;
        
      },
      setIsSearch: (state, action) => {
        state.isSearch = action.payload;
        
      },
      setIsUploadLoader: (state, action) => {
        state.isUploadLoader = action.payload;
        
      },
      setIsDeleteMenu: (state, action) => {
        state.isDeleteMenu = action.payload;
        
      },
      setIsUploaderFile: (state, action) => {
        state.isUploaderFile = action.payload;
        
      },
      setIsSelectDeletedChat: (state, action) => {
        state.isSelectDeleteChat = action.payload;
        
      },
     
  },
});

export const { setIsAddMember,setIsDeleteMenu,setIsMobile,setIsNewMessageAlert,setIsNewGroup,setIsNewNotification,setIsSearch,setIsSelectDeletedChat,setIsUploaderFile ,setIsUploadLoader} = misc.actions;
export default misc;
