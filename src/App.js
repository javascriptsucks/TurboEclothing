import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
// import { setCurrentUser } from './store/user/user.action'; CHANGED_REDUCER_TO_REDUX_SAGA
import { checkUserSession } from './store/user/user.action';

import {
  // onAuthStateChangedListener, CHANGED_REDUCER_TO_REDUX_SAGA
  // createUserDocumentFromAuth, CHANGED_REDUCER_TO_REDUX_SAGA
  // getCurrentUser CHANGED_TO_CHECKUSERSESSION_FROM_SAGA
} from './utils/firebase/firebase.utils';

// const Shop = () => {
//   return (<div><h1>I am the Shop Page!</h1></div>)
// }

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='contact' element />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>

    </Routes>)
}

export default App;
