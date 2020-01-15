import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, List, ListItemText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton,ListItemSecondaryAction } from '@material-ui/core';

/**
 * @ignore
 */
const useStyles = makeStyles(theme => ({
    list : {
        maxHeight: '100%',
    }
}));

/**
 * TODO
 */
function generateListItems(classes,items,addHandler,deleteHandler,hoverHandler,selectKpi) {

    let listItems = []
    // eslint-disable-next-line
    for (let [i,k] of items.entries()) {
        listItems.push(
            <ListItem key={i} button selected={!k.hidden} onMouseOver={() => hoverHandler(k.id,true)} onMouseOut={() => hoverHandler(k.id,false)} 
                        onClick={() => k.hidden ? addHandler(k.id): deleteHandler(k.id)}>
                <ListItemText
                primary={k.id+": "+k.name}
                />
                <ListItemSecondaryAction>
                    <IconButton disabled={k.hidden} onClick={() => selectKpi(k.id)}>
                        <EditIcon/>
                    </IconButton>
                </ListItemSecondaryAction>    
            </ListItem>
        )
    }
    return listItems
}

/**
 * TODO
 */
export default function ShortListBoardList(props) {
  const classes = useStyles();

  return (
    <List disablePadding className={classes.list}> 
    {generateListItems(classes,props.items,props.addHandler,props.deleteHandler,props.hoverHandler,props.selectKpi)}
    </List>
  );
}