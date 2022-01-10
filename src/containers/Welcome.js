import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core'
import ReactPlayer from 'react-player'
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Div100vh from 'react-div-100vh';
import { useMediaQuery } from 'react-responsive';

import SecundaryBackground from '@images/secondary_welcome_background.png';
import PrimaryBackground from '@images/primary_welcome_background.png';
import Logo from '@images/white_logo.png';
import DomoryLogo from '@images/domory_logo.png';


const IntroStyles = makeStyles(theme => ({
    root:{
        position: "fixed",
        height: "100%", 
        width: "100%",
        backgroundColor: theme.colors.primary.alabaster,
        '& $video_container':{
            position: "absolute",
            display: "flex",
            width: "100%", 
            height: "100%",
            [theme.breakpoints.down('lg')]: {
                flexDirection: "column",
            },
        },
        '& $logo_container': {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
        },
        '& $domory_logo_container': {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignContent: "flex-end",
            alignItems: "flex-end",
            height: "100%",
            width: "100%",
            '& $img':{
                [theme.breakpoints.down('lg')]: {
                    height: "auto",
                    width: "25%",
                    paddingBottom: "5vw",
                },
                [theme.breakpoints.down('sm')]: {
                    height: "auto",
                    width: "30%",
                    paddingBottom: "5vw",
                },
                [theme.breakpoints.up('lg')]: {
                    height: "6%",
                    width: "auto",
                    paddingBottom: "5vh",
                },
            },
        },
        '& $background': {
            width: "100%", 
            height: "50%",
            [theme.breakpoints.up('lg')]: {
                width: "50%", 
                height: "100%",
            },
            '& $primary_background':{
                position: "absolute",
                width: "100%", 
                height: "50%",
                backgroundColor: theme.colors.primary.rich_black,
                [theme.breakpoints.up('lg')]: {
                    width: "50%", 
                    height: "100%",
                },
            },
           '& $secondary_background':{
                position: "absolute",
                width: "100%", 
                height: "50%",
                backgroundColor: theme.colors.secondary.smoky_black,
                [theme.breakpoints.up('lg')]: {
                    width: "50%", 
                    height: "100%",
                    top: 0,
                    right: 0
                },
            },
        },
    },
    video_container:{},
    background: {},
    primary_background: {},
    secondary_background: {},
    logo_container: {},
    domory_logo_container: {},
    img: {},
}));

const animations = {
    primary_background_initial_video:{
        y: "-180%"    
    },
    secondary_background_initial_video:{
        y: "180%",
    },
    background_animated_video:{
        y: "0%"    
    }, 
    logo_initial: {
        opacity: 0, 
        scale:0.6
    },
    logo_animated: {
        opacity: 1, 
        scale: 1
    },
    background_initial: {
        opacity: 0
    },
    background_animated:{
        opacity: 1
    }
};

const logoTransition = {
    duration: 2,
    delay: 2
};

function Welcome(props) {

    const classes = IntroStyles();

    const animation = useAnimation();

    let screenSecondary = false;
    let screenPrimary = false;
    
    const [screenLogo, setScreenLogo] = useState(false)
    const [screenLogoDomory, setScreenLogoDomory] = useState(true)
    
    const MobileOrTablet = ({ children }) => {
        const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileOrTablet ? children : null
    }

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    async function sequence() {
        // Shrink horizontally
        await animation.start({
            y: "0%",
            transition: { duration: 2 },
        })
        // Grow back
        animation.start({
            opacity: 0,
            transition: { delay: 2, duration: 2 },
        })
    }

    function handleChange(value) {
        props.onChange(value);  
    }

    useEffect(() => {
        setScreenLogo(true);
            setScreenLogoDomory(true);
            sequence();

            setTimeout(() => {
                handleChange(true);
            }, 7000); 
        
    }, [])

    

    return (
        <Div100vh>
            <div className={classes.root}>
            <div className={classes.video_container}>
                <div className={classes.background}>
                    <motion.div layoutId="primary_background" initial={{opacity: 0}}
                    animate={{opacity: screenLogo ? 1 : 0}} transition={{delay: 3}} 
                    className={classes.primary_background}/>
                    <motion.div initial="primary_background_initial_video"
                        animate={animation} variants={animations} className={classes.primary_background}>
                            <img src={PrimaryBackground} style={{height: "100%", width: "100%", objectFit:"cover"}}/>
                    </motion.div>
                </div>
                <div className={classes.background}>
                    <motion.div layoutId="secondary_background"initial={{opacity: 0}}
                    animate={{opacity: screenLogo ? 1 : 0}} transition={{delay: 3}} 
                    className={classes.secondary_background}/>
                    <motion.div initial="secondary_background_initial_video"
                        animate={animation} variants={animations} className={classes.secondary_background}>
                            <img src={SecundaryBackground} style={{height: "100%", width: "100%", objectFit:"cover"}}/>
                    </motion.div>
                </div>  
            </div>

            <AnimatePresence>
                {screenLogo && 
                (
                    <motion.div initial="logo_initial" className={classes.logo_container}
                    animate="logo_animated" variants={animations} transition={logoTransition} >
                        <motion.div layoutId="logo" style={{height: "40%", width: "auto"}}>
                            <img height="100%" 
                            width="auto" src={Logo} alt="Le Petite Gastronimique"/>
                        </motion.div>
                    </motion.div>
               )}   
            </AnimatePresence>

            <motion.div className={classes.domory_logo_container} initial={{opacity: 0}}
                animate={{opacity: screenLogo ? 1 : 0}} transition={{duration: 2}} >
                    <motion.img  className={classes.img} initial={{opacity: 1}} 
                    animate={animation} variants={animations} transition={{delay: 1}} 
                    src={DomoryLogo} alt="Le Petite Gastronimique"/>
            </motion.div>

            </div>
            

        </Div100vh>
        
    )
}

export default Welcome
