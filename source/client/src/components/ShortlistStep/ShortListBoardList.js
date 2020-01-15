import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, List, ListItemText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton,ListItemSecondaryAction } from '@material-ui/core';

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

function generateListItems(classes,items,addHandler,deleteHandler,hoverHandler,selectKpi) {

    let listItems = []
    // eslint-disable-next-line
    for (let [i,k] of items.entries()) {
        listItems.push(
            <ListItem key={i} button selected={!k.hidden} onMouseOver={() => hoverHandler(i,true)} onMouseOut={() => hoverHandler(i,false)} 
                        onClick={() => k.hidden ? addHandler(i): deleteHandler(i)}>
                <ListItemText
                primary={k.id+": "+k.name}
                />
                <ListItemSecondaryAction>
                    <IconButton disabled={k.hidden} onClick={() => selectKpi(i)}>
                        <EditIcon/>
                    </IconButton>
                </ListItemSecondaryAction>    
            </ListItem>
        )
    }
    return listItems
}

export default function ShortListBoardList(props) {
  const classes = useStyles();

  return (
    <div className={classes.listRoot}>
        <List disablePadding className={classes.list}> 
            {generateListItems(classes,props.items,props.addHandler,props.deleteHandler,props.hoverHandler,props.selectKpi)}
        </List>
    </div>
  );
}