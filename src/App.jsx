import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import List from "./List";
import Signin from "./Signin";
import Signup from "./Signup";
import Update from "./Update";
import Add from "./Add";


const App = () => {
const[user,setUser]=useState(null);
const PrivateRoute=({children,user})=>{
  if(!user){
    return <Navigate to={'/signin'}></Navigate>
  }
  if(user !== 1){
  }
  return children;
}
return(
<Routes>
 <Route path="/products" element={
  <PrivateRoute user={user}><List/></PrivateRoute>
 }></Route>
  <Route path="/products/add" element={
  <PrivateRoute user={user}><Add/></PrivateRoute>
 }></Route>
  <Route path="/products/:id/edit" element={
  <PrivateRoute user={user}><Update/></PrivateRoute>
 }></Route>
  <Route path="/signin" element={
  <Signin setUser={setUser} />
 }></Route>
  <Route path="/signup" element={
  <Signup/>
 }></Route>
</Routes>
)
};

export default App;
