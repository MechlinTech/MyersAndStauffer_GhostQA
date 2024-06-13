import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'100vh'
      },
    center: {
        // height:'50vh',
        // width:'40vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        // background: '#fff', 
        color:'#000',
        borderRadius:'7px',
      },
      text:{
        // margin:'50px',
        display: 'flex',
        fontWeight:'bold',
        justifyContent: 'center',
        flexDirection:'column',
        alignItems: 'center',
        color:'#fff'
      },
      header:{
        textTransform:'uppercase',
        letterSpacing:'2px',
      },
    }));

export default useStyles;