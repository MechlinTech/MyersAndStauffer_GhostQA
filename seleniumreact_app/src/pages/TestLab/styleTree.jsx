import { makeStyles } from "@material-ui/core";

export const useStylesTree = makeStyles({
    rootNodeFolder: {
        listStyle: 'none',
        padding:'0 20px'

    },
    child: {
        listStyle: 'none',
    },
    crud: {
        listStyle: 'none',
        alignItems: 'center'
    },
    crud: {
        display: 'none', // Hide crud by default
    },
    cardListHolderList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px 10px',
        boxShadow:'-4px 0px 7px 0px rgba(101, 77, 247,0.2), -6px -1px 6px 0px rgba(101, 77, 247,0.14), 7px 0px 6px 0px rgba(101, 77, 247,0.12)',
        borderRadius: '10px',
        border: "solid 2px #fff",
        margin: '5px 0px',
       '&:hover': {
        border: "solid 2px rgba(101, 77, 247,0.9)",
        '& $crud': { // Target the immediate child with class 'crud' when hovering over cardListHolderList
            display: 'flex', // Display crud elements when cardListHolderList is hovered
        },
    },
},
    cardListHolder: {
    display: 'flex',
    flexDirection: 'column',

},

    editTheFolder: {
    border: 'solid 1px #3a3a3a',
    padding: '4px 10px',
    fontSize: '18px',
    fontWeight: '400',
    borderRadius: '10px',
    width:'90%',
    
},
updateEdit:{
    display: "flex",
    alignItems: 'center',
    marginLeft: '36px',
   
},
orgTree:{
    overflow:"auto",
    height: '64vh'
}
    
    
});

