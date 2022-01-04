import React from 'react'
import IconButton from '@mui/material/IconButton/IconButton';
import Icon from "@material-ui/core/Icon";
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";

const styles = makeStyles(theme => ({
    root: ({size}) => ({
        backgroundColor: theme.button.background_color,
        color: theme.colors.primary.alabaster,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('lg')]: {
            width: "9vw !important",
            height: "9vw !important",
        },
        [theme.breakpoints.down('sm')]: {
            width: "10vw !important",
            height: "10vw !important",
        },
        [theme.breakpoints.up('lg')]: {
            width: "5vh !important",
            height: "5vh !important",
        },
    }),
    item_container: ({size}) => ({
        position: "absolute",
        backgroundColor: theme.colors.secondary.golden_brown,
        top: "-2vw",
        right: 0,
        borderRadius: "50%",
        textAlign: "center",
        color: "white",
        fontFamily: "WorkSans",
        fontWeight: "bold",
        [theme.breakpoints.up('lg')]: {
            fontSize: "0",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "4vw",
            width: "5vw",
            height: "5vw",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "5vw",
            width: "6vw",
            height: "6vw",
        },
    }),
}));

function MenuIconButton({onClick, icon, size, items}) {

    const classes = styles();

    return (
        <div>
            <motion.div transition={{duraiton: 0.8}}>
                <IconButton onClick={onClick} className={classes.root}>
                    <img style={{height: "100%", width: "100%"}} alt="" src={icon}/>        
                </IconButton>
            </motion.div>
            {items && (
                <motion.div transition={{duraiton: 0.8}}
                className={classes.item_container}>
                    <span>{items}</span>
                </motion.div>)}
        </div>
        
    )
}

export default MenuIconButton
