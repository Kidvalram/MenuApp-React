import React from 'react'
import IconButton from '@mui/material/IconButton/IconButton';
import Icon from "@material-ui/core/Icon";
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";

const styles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.button.background_color,
        color: theme.colors.primary.alabaster,
        position: "relative !important",
        display: "flex !important",
        justifyContent: "center !important",
        alignContent: "center !important",
        alignItems: "center !important",
        [theme.breakpoints.down('lg')]: {
            width: "6vw !important",
            height: "6vw !important",
        },
        [theme.breakpoints.down('sm')]: {
            width: "8vw !important",
            height: "8vw !important",
        },
        [theme.breakpoints.up('lg')]: {
            width: "4vh !important",
            height: "4vh !important",
        },
    },
    item_container: {
        position: "absolute",
        backgroundColor: theme.colors.secondary.golden_brown,
        top: "-2vw",
        right: 0,
        borderRadius: "50%",
        textAlign: "center",
        color: "white",
        fontFamily: "WorkSans",
        fontWeight: "bold",
        [theme.breakpoints.down('lg')]: {
            fontSize: "3.5vw",
            width: "4.5vw",
            height: "4.5vw",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "5vw",
            width: "6vw",
            height: "6vw",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "2vh",
            width: "3vh",
            height: "3vh",
            marginTop: "3vh !important",
            marginRight: "-1vh !important"
        },
    },
}));

function CardIconButton({onClick, icon, items}) {

    const classes = styles();

    return (
        <div>
            <motion.div transition={{duraiton: 0.8}}>
                <IconButton onClick={onClick} className={classes.root}>
                    <img style={{height: "100%", width: "100%"}} alt="" src={icon}/>        
                </IconButton>
            </motion.div>
            {items > 0 && (
                <motion.div transition={{duraiton: 0.8}}
                className={classes.item_container}>
                    <span>{items}</span>
                </motion.div>)}
        </div>
    )
}

export default CardIconButton
