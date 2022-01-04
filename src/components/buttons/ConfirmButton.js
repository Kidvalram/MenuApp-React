import React from 'react'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const styles = makeStyles(theme => ({
    root: {
        fontFamily: "Work Sans",
        fontWeight: theme.button.font_weight,
        backgroundColor: theme.button.background_color,
        color: theme.colors.primary.alabaster,
        borderRadius: theme.button.border_radius,
        height: "100% !important",
        width: "100% !important",
        display: "flex !important",
        justifyContent: "center !important",
        alignContent: "center !important",
        alignItems: "center !important",
        fontWeight: "bold !important",
        textAlign: "center !important",
        borderRadius: "20px 20px 0px 0px !important",
        backdropFilter: "blur(7px) !important",
        backgroundColor: theme.button.background_color,
       
        [theme.breakpoints.down('lg')]: {
            fontSize: theme.button.category.size_font.values.md,

        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "5.5vw !important",

        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.button.category.size_font.values.lg,
        },
    },
    label: {
        textTransform: "capitalize"
    }
})); 

function ConfirmButton({onClick, text}) {

    const classes = styles();

    return (
        <Button onClick={onClick} className={classes.root}>
            <motion.span key={text} className={classes.label} initial={{opacity:0}} 
            exit={{opacity:0}} animate={{opacity:1}} 
            transition={{duration: .8}}>{text}</motion.span>
        </Button>
    )

}

export default ConfirmButton
