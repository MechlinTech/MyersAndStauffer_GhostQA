import Layout from './Layout'
import { useEffect,Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { LOG_IN } from './redux/actions/authActions'

const Auth = lazy(() => import("./pages/Auth"))

function App() {
  const dispatch = useDispatch()
  const { isLogedIn } = useSelector(state => state.auth)
  console.log("is login ",isLogedIn)
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("userData"))
    if (data) {
      dispatch({ type: LOG_IN, payload: data  })
    }
  }, [])

  return (
    <div>
       <Suspense fallback={<div>
      <h1>LOADING ....</h1>
     </div>}>
      {isLogedIn ? <Layout /> : <Auth />}
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