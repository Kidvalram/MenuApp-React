import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import {useGlobalState} from 'state-pool';
import { useMediaQuery } from 'react-responsive';

//Icons
import HomeIcon from '@icons/home_white_icon.png';
import MailIcon from '@icons/email_white_icon.png';
import PhoneIcon from '@icons/call_white_icon.png'
import FacebookIcon from '@icons/facebook_white_icon.png';
import InstagramIcon from '@icons/instagram_white_icon.png';
import TwitterIcon from '@icons/twitter_white_icon.png';

//Images
import LightMenu from '@images/light_menu.png';
import DarkMenu from '@images/dark_menu.png';

//Components
import CategoryButton from '@components/buttons/CategoryButton';
import {TabDescription as TabDescription} from '@shared/GlobalData.js';

const TabStyles = makeStyles(theme => ({
    root:{
        position: "fixed",
        height: "inherit",
        width: "inherit",
        [theme.breakpoints.up('lg')]: {
            height: "100%",
            width: "20%",        
            position: "fixed",
            left: 0,
            top: 0

            
        },
        '& $shadow_background':{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(2px)",
        },
        '& $tab':{
            position: "relative",
            height: "100%",
            width: "45%",
            [theme.breakpoints.up('lg')]: {
                width: "100%",
            },
            '& $logo_container':{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "25%",
                width: "100%",
                boxShadow: "1px 0 10px rgba(0, 0, 0, 0.8)",
                backgroundColor: theme.colors.primary.alabaster,
            },
            '& $info_container':{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "75%",
                width: "100%",
                boxShadow: "1px 0 10px rgba(0, 0, 0, 0.8)",
                backgroundColor: theme.colors.secondary.smoky_black,
                '& $buttons_section':{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "2vh",
                    paddingBottom: "2vh",
                    margin: "7%",
                    gap: "2vh",
                    width: "auto",
                },
                '& $info_section':{
                    display: "flex",
                    paddingBottom: "2vh",  
                    justifyContent: "center",
                    flexDirection: "column",  
                    margin: "7%", 
                    gap: "2vh",
                    width: "80%",
                    '& $info_item':{
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center", 
                        fontFamily: "Ruluko",
                        width: "100%",
                        color: theme.colors.primary.alabaster,
                        [theme.breakpoints.down('lg')]: {
                            gap: "1.5vw",     
                        },
                        [theme.breakpoints.down('sm')]: {
                            gap: "1.5vw",     
                        },
                        [theme.breakpoints.up('lg')]: {
                            gap: "1vh",     
                        },
                        '& img':{
                            width: "auto", 
                            [theme.breakpoints.down('lg')]: {
                                height: "5vw",  
                            },
                            [theme.breakpoints.down('sm')]: {
                                height: "5vw",  
                            },
                            [theme.breakpoints.up('lg')]: {
                                height: "4vh",
                            },
                        },
                        '& span':{
                            whiteSpace: "wrap",
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "3vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "3.2vw",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "2.5vh",
                            },
                        }
                    }
                },
                '& $social_container':{
                    position: "absolute",
                    display: "flex",
                    bottom: "3vh",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2.5vh",
                    '& $line': {
                        border: "0",
                        backgroundColor: theme.colors.primary.alabaster,
                        height: "2px",
                        width: "65%"
                    }, 
                    '& $social_section':{
                        display: 'flex',
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-around",
                        width: "100%",
                        marginLeft: "1.5vw",
                        marginRight: "1.5vw",
                        '& img':{
                            [theme.breakpoints.down('lg')]: {
                                height: "5vw",
                                width: "auto",                            },
                            [theme.breakpoints.down('sm')]: {
                                height: "5vw",
                                width: "auto",  
                            },
                            [theme.breakpoints.up('lg')]: {
                                height: "3vh",
                                width: "auto",    
                            },
                        },
                    },
                    
                },
            },
        }

    },
    tab: {},
    shadow_background:{},
    language_button:{},
    logo_container:{},
    info_container:{},
    buttons_section:{},
    social_container:{},
    social_section:{},
    info_item:{},
    line:{},
    info_section:{},
}));

const animations = {
    initial_background: {
        opacity: 0,
    },
    initial_tab: {
        x: "-110vw",
    },
    animate_tab:{
        x: "0vw",
    },
    animate_background:{
        opacity: 1,
    },
};

const tabTransition = {
    duration: 1,
}

const backgroundTransition = {
    duration: .8
}

function tab(props) {

    const classes = TabStyles();
    const [language, setLanguage] = useGlobalState("language");

    const MobileOrTablet = ({ children }) => {
        const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileOrTablet ? children : null
    }
    
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const isDesktop = useMediaQuery({ minWidth: 992 })


    function buttonHandle(event,value){
        event.persist();
        setTimeout(() => {
            props.onChange(value);
        }, 100)
    }

    return (
        <AnimatePresence>
            {props.isVisible && (
                <Div100vh className={classes.root}>
                <MobileOrTablet>
                    <motion.div initial={"initial_background"} variants={animations} 
                    animate="animate_background" transition={backgroundTransition} 
                    exit="initial_background" className={classes.shadow_background}
                    onClick={(e) => buttonHandle(e,"background")}/>
                    <motion.div initial="initial_tab" variants={animations} 
                        animate="animate_tab" transition={tabTransition} 
                        exit="initial_tab" className={classes.tab}>
                                <div className={classes.logo_container}>
                                    <Mobile>
                                    <img height="60%" src={DarkMenu} alt="Le Petite Gastronomique"/>
                                    </Mobile>
                                    <Tablet>
                                    <img height="70%" src={DarkMenu} alt="Le Petite Gastronomique"/>
                                    </Tablet>
                                    <Desktop>
                                    <img height="75%" src={DarkMenu} alt="Le Petite Gastronomique"/>
                                    </Desktop>
                                </div>
                            <div className={classes.info_container}>
                                <div className={classes.buttons_section}>
                                    <CategoryButton text={TabDescription[language].menu} onClick={(e) => buttonHandle(e,"menu")}/>
                                    <CategoryButton text={TabDescription[language].about} onClick={(e) => buttonHandle(e,"about")}/>
                                    <CategoryButton text={TabDescription[language].order} onClick={(e) => buttonHandle(e,"order")}/>
                                </div>
                                <div className={classes.info_section}>
                                    <div className={classes.info_item}>
                                        <img src={HomeIcon} alt="Address Restaurant"/>
                                        <span>24 Rue Crébillon, 44000 Nantes</span>
                                    </div>
                                    <div className={classes.info_item}>
                                        <img src={MailIcon} alt="Mail Restaurant"/>
                                        <span>abdcasd@gmail.com</span>
                                    </div>
                                    <div className={classes.info_item}>
                                        <img src={PhoneIcon} alt="Phone Number Restaurant"/>
                                        <span>02-33-22-44-55</span>
                                    </div>
                                </div>
                                <div className={classes.social_container}>
                                    <div className={classes.line}/>
                                    <div className={classes.social_section}>
                                        <img src={FacebookIcon} alt="Facebook Le Petit Gastronimique"/>
                                        <img src={InstagramIcon} alt="Facebook Le Petit Gastronimique"/>
                                        <img src={TwitterIcon} alt="Facebook Le Petit Gastronimique"/>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                </MobileOrTablet>
                <Desktop>
                <motion.div initial={props.static ? "" : "initial_tab"} variants={animations} 
                        animate="animate_tab" transition={tabTransition} 
                         className={classes.tab}>
                        <div className={classes.logo_container}>
                            <Mobile>
                            <img height="60%" src={LightMenu} alt="Le Petite Gastronomique"/>
                            </Mobile>
                            <Tablet>
                            <img height="70%" src={LightMenu} alt="Le Petite Gastronomique"/>
                            </Tablet>
                            <Desktop>
                            <img height="75%" src={DarkMenu} alt="Le Petite Gastronomique"/>
                            </Desktop>
                        </div>
                    <div className={classes.info_container}>
                        <div className={classes.buttons_section}>
                            <CategoryButton text={TabDescription[language].menu} onClick={(e) => buttonHandle(e,"menu")}/>
                            <CategoryButton text={TabDescription[language].about} onClick={(e) => buttonHandle(e,"about")}/>
                            <CategoryButton text={TabDescription[language].order} onClick={(e) => buttonHandle(e,"order")}/>
                        </div>
                        <div className={classes.info_section}>
                            <div className={classes.info_item}>
                                <img src={HomeIcon} alt="Address Restaurant"/>
                                <span>24 Rue Crébillon, 44000 Nantes</span>
                            </div>
                            <div className={classes.info_item}>
                                <img src={MailIcon} alt="Mail Restaurant"/>
                                <span>abdcasd@gmail.com</span>
                            </div>
                            <div className={classes.info_item}>
                                <img src={PhoneIcon} alt="Phone Number Restaurant"/>
                                <span>02-33-22-44-55</span>
                            </div>
                        </div>
                        <div className={classes.social_container}>
                            <div className={classes.line}/>
                            <div className={classes.social_section}>
                                <img src={FacebookIcon} alt="Facebook Le Petit Gastronimique"/>
                                <img src={InstagramIcon} alt="Facebook Le Petit Gastronimique"/>
                                <img src={TwitterIcon} alt="Facebook Le Petit Gastronimique"/>
                            </div>
                        </div>
                    </div>
                </motion.div>
                </Desktop>
                             
            </Div100vh>)}
        </AnimatePresence>
    )
}

export default tab
