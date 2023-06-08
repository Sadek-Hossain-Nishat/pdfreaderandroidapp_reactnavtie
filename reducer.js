import reducerCases from "./contextConstants";

const initialState ={
  ishome:null

}


const  reducer = (action,state)=>{
  switch (action.type) {

    case reducerCases.SET_HOMEPAGE:
      return{
        ...state,
        ishome:action.home
      }
    default:
      return 

  }
}