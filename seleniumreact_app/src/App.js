import Layout from './Layout'
import { useEffect,Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { LOG_IN } from './redux/actions/authActions'
import { Box, CircularProgress } from '@mui/material';

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
       <Suspense 
       fallback={
      //  <Box sx={{
      //     display:'flex',
      //     justifyContent:'center',
      //     alignItems:'center',
      //     height:'80vh'
      //   }}>
      //     <CircularProgress sx={{color:'#654DF7'}}/>
      //   </Box>
      <h1>loading...</h1>
      }>
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