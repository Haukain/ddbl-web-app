import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, List, IconButton, ListItemText } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    listRoot : {
        height : 500
    },
    list : {
        overflow: 'auto',
        maxHeight: '100%',
        width: 300
    }
}));

function generateListItems(classes,items,addHandler,deleteHandler,hoverHandler) {

    let listItems = []
    for (let i =0; i<items.length; i++) {
        listItems.push(
            <ListItem key={i} onMouseOver={() => hoverHandler(i,true)} onMouseOut={() => hoverHandler(i,false)}>
                <ListItemText
                primary={(i+1)+": "+items[i]}
                />
                <IconButton onClick={() => addHandler(i)}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton onClick={() => deleteHandler(i)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        )
    }
    return listItems
}

export default function ShortListingBoardList(props) {
  const classes = useStyles();

  return (
    <div className={classes.listRoot}>
        <List disablePadding className={classes.list}> 
            {generateListItems(classes,props.items,props.addHandler,props.deleteHandler,props.hoverHandler)}
        </List>
    </div>
  );
}