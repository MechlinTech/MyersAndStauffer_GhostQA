import { makeStyles } from "@material-ui/core";

export const useStylesTree = makeStyles({
    rootNodeFolder: {
        listStyle: 'none',

    },
    child: {
        listStyle: 'none',
    },
    crud: {
        listStyle: 'none',
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
        margin: '5px 0px',
       '&:hover': {
        '& $crud': { // Target the immediate child with class 'crud' when hovering over cardListHolderList
            display: 'block', // Display crud elements when cardListHolderList is hovered
        },
    },
},
    cardListHolder: {
    display: 'flex',
    flexDirection: 'column',

},
    editTheFolder: {
    border: 'solid 1px #e9e9e9',
    padding: '4px 0px',
    fontSize: '24px',
    fontWeight: '400',
    borderRadius: '10px',
}
    
    
});

