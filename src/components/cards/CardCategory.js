import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { motion, AnimatePresence } from "framer-motion";

const CardCategoryStyle = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        height: "inherit",
        width: "inherit",
        boxShadow: ".1px 15px 15px #000000",        
        borderRadius: "20px",
    },
    title_section:{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: theme.colors.button.smoky_black, 
        fontFamily: "WorkSans",
        fontWeight: "bold",
        textAlign: "center",
        bottom: 0,
        borderRadius: "20px",
        width: "100%",
        height: "12%",
        backdropFilter: "blur(3px)",
        backgroundColor: theme.colors.button.light_background,
        [theme.breakpoints.down('sm')]: {
            fontSize: "3.8vw",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "3.5vw",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "2.3vh",
        },
    }
}));

function CardCategory({photo, text}) {

    const classes =  CardCategoryStyle();

    return (
        <div className={classes.root}>
            <img style={{borderRadius: "20px" ,objectFit: "cover"}}  alt="" src={photo}/>
            <div className={classes.title_section}>
                <motion.span key={text} initial={{opacity:0}} exit={{opacity:0}}
                animate={{opacity:1}} transition={{duration: 1.6}}>{text}</motion.span>  
            </div>
        </div>
    )
}

export default CardCategory
