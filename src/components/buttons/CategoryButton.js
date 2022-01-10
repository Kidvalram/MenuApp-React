import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        width: "100% !important",
        fontFamily: "WorkSans !important",
        fontWeight: "bold",
        backgroundColor: "rgba(196,196,196,19%) !important",
        color: theme.colors.primary.alabaster,
        borderRadius: "10px !important",
        textAlign: "center !important",
        [theme.breakpoints.down('lg')]: {
            height: "5vh !important",
            fontSize: "3.5vw !important",
        },
        [theme.breakpoints.down('sm')]: {
            height: "5vh !important",
            fontSize: "3.8vw !important",
        },
        [theme.breakpoints.up('lg')]: {
            height: "4vh !important",
            fontSize: "2.3vh !important",
        },
    },
    label: {
        textTransform: "capitalize"
    }
}));

function CategoryButton({onClick, text}){

    const classes = styles();

    return (
        <Button onClick={onClick} className={classes.root}>
            {text}
        </Button>
    )
}

export default CategoryButton
