import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      },
      gridContainer: {
        padding: '20px',
      },
      cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      },
      logoAndTitle: {
        display: 'flex',
        alignItems: 'center',
      },
      logo: {
        marginRight: '10px',
      },
      cardContent: {
        marginTop: '10px',
      },
      cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: theme.spacing(2),
      },
      learnMoreLink: {
        color: '#3f51b5',
        textDecoration: 'none',
        marginRight: theme.spacing(1),
        cursor: 'pointer',
      },
      manageButton: {
        backgroundColor: '#654DF7',
        color: 'white',
        padding: theme.spacing(1),
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#4638ab',
        },
      },
      
}));
