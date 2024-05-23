import Layout from './Layout'
import { useEffect,Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { LOG_IN } from './redux/actions/authActions'
import Load from './comman/spiner/Spin';
import AuthNav from './Routes/AuthNav';

function App() {
  const dispatch = useDispatch()
  const { isLogedIn } = useSelector(state => state.auth)
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("userData"))
    if (data) {
      dispatch({ type: LOG_IN, payload: data  })
    }
  }, [dispatch])

  return (
    <div>
       <Suspense fallback={
        <Load/>}>

      {isLogedIn ? <Layout /> : <AuthNav />}
      {/* {isLogedIn ? <Auth />  : <Layout /> } */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
      </Suspense>
    </div>

  );
}

export default App;