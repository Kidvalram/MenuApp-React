import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import IconButton from '@mui/material/IconButton/IconButton';
import Icon from "@material-ui/core/Icon";
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";
import { useRive, useStateMachineInput } from 'rive-react';
import {useGlobalState} from 'state-pool';

//Rive
import CheckmarkIcon from '@rive/checkmark_icon.riv';

const styles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('lg')]: {
            width: "12vw !important",
            height: "12vw !important",
        },
        [theme.breakpoints.down('sm')]: {
            width: "13vw !important",
            height: "13vw !important",
        },
        [theme.breakpoints.up('lg')]: {
            width: "6.2vh !important",
            height: "6.2vh !important",
        },
    },
    item_container: {
        position: "absolute",
        backgroundColor: theme.colors.secondary.golden_brown,
        right: 0,
        borderRadius: "50%",
        textAlign: "center",
        color: theme.colors.primary.alabaster,
        fontFamily: "WorkSans",
        fontWeight: "bold",
        [theme.breakpoints.down('lg')]: {
            width: "5vw !important",
            height: "5vw !important",
            fontSize: "3.5vw",
            top: "-2vw",
        },
        [theme.breakpoints.down('sm')]: {
            width: "5.4vw !important",
            height: "5.4vw !important",
            fontSize: "4vw",
            top: "-2vw !important",
        },
        [theme.breakpoints.up('lg')]: {
            width: "2.6vh !important",
            height: "2.6vh !important",
            fontSize: "2vh",
            top: "-.5vh !important",
        },
    },
    checkmark_icon: {
        position: "relative",
        overflow: "hidden",
        color: "white",
        [theme.breakpoints.down('lg')]: {
            width: "11.5vw !important",
            height: "11.5vw !important",
            marginBottom: "25% !important",
        },
        [theme.breakpoints.down('sm')]: {
            width: "13vw !important",
            height: "13vw !important",
            marginBottom: "3vw !important",

        },
        [theme.breakpoints.up('lg')]: {
            width: "6.2vh !important",
            height: "6.2vh !important",
            marginBottom: "-.5vh !important",
        },
    },
}));

function CartButton({onClick, size, items, checkmark}) {

    const classes = styles();
    const [animation, setAnimation] = useGlobalState("addAnimation");

    const { RiveComponent, rive } = useRive({
        src: CheckmarkIcon,
        stateMachines: 'State Machine 1',
        autoplay: true,
        onLoop: true,
        animations: "Animations"
    });

    var onClickInput = useStateMachineInput(
        rive,
        'State Machine 1',
        'Trigger'
    );

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

  });

    useEffect(() => {
        if(animation === true) {
            setAnimation(false);
            onClickInput.fire();
        }
    }, [items]);
    
    return (
        <div onClick={onClick}>
            <div 
            className={classes.root}>
                <RiveComponent className={classes.checkmark_icon}/>
            </div>  
            <>
            {items > 0 && (
                <div
                className={classes.item_container}>
                    <motion.span key={items} transition={{delay:.8 ,duraiton: 1.6}} initial={{opacity: 0}}
                    exit={{opacity: 0}} animate={{opacity: 1}}>{items}</motion.span>
                </div>
            )}
            </>
        </div>
        
    )
}

export default CartButton
