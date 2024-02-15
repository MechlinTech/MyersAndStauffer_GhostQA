import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    center: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection:'column',
        background: '#000',
        color:'white'
      },
      waveContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text:{
        margin:'100px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'column',
        alignItems: 'center',
      },
      header:{
        textTransform:'uppercase',
        letterSpacing:'2px'
      },
      wave: {
        width: '5px',
        height: '100px',
        background: '#654DF7',
        margin: '10px',
        borderRadius: '20px',
      },
      wave1: {
        animation: '$wave 1s linear infinite 0s',
      },
      wave2: {
        animation: '$wave 1s linear infinite 0.1s',
      },
      wave3: {
        animation: '$wave 1s linear infinite 0.2s',
      },
      wave4: {
        animation: '$wave 1s linear infinite 0.3s',
      },
      wave5: {
        animation: '$wave 1s linear infinite 0.4s',
      },
      wave6: {
        animation: '$wave 1s linear infinite 0.5s',
      },
      wave7: {
        animation: '$wave 1s linear infinite 0.6s',
      },
      wave8: {
        animation: '$wave 1s linear infinite 0.7s',
      },
      wave9: {
        animation: '$wave 1s linear infinite 0.8s',
      },
      wave10: {
        animation: '$wave 1s linear infinite 0.9s',
      },
      '@keyframes wave': {
        '0%': {
          transform: 'scale(0)',
        },
        '50%': {
          transform: 'scale(1)',
        },
        '100%': {
          transform: 'scale(0)',
        },
      },
    }));

export default useStyles;