import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { motion } from "framer-motion";
import Div100vh from 'react-div-100vh';
import { useNavigate } from "@reach/router";
import { useGlobalState } from 'state-pool';
import { useMediaQuery } from 'react-responsive';


//Images
import Logo from '@images/white_logo.png';
import MobileBackground from '@images/about_mobile_background.png';
import TabletBackground from '@images/about_tablet_background.png';
import DesktopBackground from '@images/about_tablet_background.png';

//Icons
import EnglandIcon from '@icons/england_flag_icon.png';
import MenuIcon from '@icons/menu_white_icon.png';

//Components
import IconButton from '@components/buttons/_IconButton';
import Tab from '@components/Tab';
import {LanguageIcon as LanguageIcon} from '@shared/GlobalData.js';
import {AboutDescription as AboutDescription} from '@shared/GlobalData.js';

const styles = makeStyles(theme => ({
    root:{
        position: "fixed",
        height: "100%",
        width: "100%",
        backgroundColor: theme.colors.secondary.smoky_black,
    },
    container: {
        position: "fixed",
        display: "flex",
        backgroundColor: theme.colors.secondary.smoky_black,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        right: 0,
        height: "100%",
        [theme.breakpoints.down('lg')]: {
            width: "100%", 
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%", 
        },
        [theme.breakpoints.up('lg')]: {
            width: "80%",
        },
        '& $video_container': {
            position: "absolute", 
            [theme.breakpoints.down('lg')]: {
                width: "110%",
                height: "110%", 
            },
            [theme.breakpoints.down('sm')]: {
                width: "100%",
                height: "100%",  
            },
            [theme.breakpoints.up('lg')]: {
                width: "100%",
                height: "100%", 
            },
        },
        '& $background': {
            position: "absolute",
            height: "100%",
            width: "100%",
            background: theme.colors.primary.rich_black
        },
        '& $background_container_intro': {
            position: "absolute",
            height: "100%",
            width: "100%",
            '& $background_intro': {
                height: "100%",
                width: "100%",
                background: theme.colors.primary.rich_black
            },
        },
        '& $language_button':{
            position: "absolute",
            top: "3vw",
            right: "3vw",
            [theme.breakpoints.up('lg')]: {
                top: "3vh",
                right: "3vh",
            },
        },
        '& $menu_button':{
            position: "absolute",
            top: "3vw",
            left: "3vw",
        },
        '& $info_container':{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "100%",
            width: "100%",
            gap: "2vh",
            '& $img': {
                [theme.breakpoints.down('lg')]: {
                    width:"28%", 
                    height:"auto"  
                },
                [theme.breakpoints.down('sm')]: {
                    width:"35%", 
                    height:"auto" 
                },
                [theme.breakpoints.up('lg')]: {
                    width:"auto", 
                    height:"30%" 
                }, 
            },
            '& $title': {
                color: theme.colors.secondary.cultured, 
                paddingLeft: "5vw",
                paddingRight: "5vw",
                paddingTop: "2vh",
                fontFamily: "WorkSans",
                fontWeight: "bold",
                textAlign: "center",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "4.2vw", 
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "5vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "3.2vh",
                }, 
            },
            '& $description': {
                color: theme.colors.secondary.cultured, 
                paddingLeft: "5vw",
                paddingRight: "5vw",
                paddingTop: "1vh",
                fontFamily: "WorkSans",
                fontWeight: "bold",
                textAlign: "center",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "3.2vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "4vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "2.5vh",
                }, 
            },
            '& $flyer': {
                position: "relative",
                [theme.breakpoints.down('lg')]: {
                    height: "55vw",
                    width: "55vw", 
                },
                [theme.breakpoints.down('sm')]: {
                    height: "75vw",
                    width: "75vw",
                },
                [theme.breakpoints.up('lg')]: {
                    height: "37vh",
                    width: "37vh",
                }, 
                '& $img': {
                    borderRadius: "20px",
                    height:"100%", 
                    width:"100%", 
                    objectFit: "cover",
                    boxShadow: ".1px 15px 15px #000000"       
                }
            }
        },
    },
    background: {},
    language_button: {},
    menu_button: {},
    info_container: {},
    title: {},
    flyer: {},
    description: {},
    img: {},
    video_container: {},
    background_intro: {},
    background_container_intro: {}
    
}));

const animations = {
    description_initial: {
        opacity: 0, 
        scale:0.8
    },
    description_animated: {
        opacity: 1, 
        scale: 1
    },
    background_initial: {
        left: "0%"
    },
    background_animated: {
        left: "100%"
    },
    video_initial: {
        opacity: 0, 
    },
    video_animated: {
        opacity: 1, 
    },
    left_initial_component:{
        x: "-150%",
    },
    right_initial_component:{
        x: "150%",
    },
    animated_component:{
        x: 0,
        y: 0,
    }, 
};

const buttonTransition = {
    delay: .8,
    duration: .8,
}

function About() {

    const classes = styles();
    const navigate = useNavigate();
    const [visibleTab, setVisibleTab] = useState(false);
    const [changeText, setChangeText] = useState(true);
    const [visibleComponent, setVisibleComponent] = useState(true);
    const [loaded, setloaded] = useGlobalState("loaded");
    const [language, setLanguage] = useGlobalState("language");

    const isDesktop = useMediaQuery({ minWidth: 992 })

    const MobileOrTablet = ({ children }) => {
        const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileOrTablet ? children : null
    }

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
      }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }
    
    useEffect(() => {
    }, []);

    function changeLanguage(){
        setChangeText(false);
        if(language === 2){
            setLanguage(0);
        }else{
            setLanguage(language + 1)
        }
    }

    function handleChange(value) {
        setVisibleTab(false);
        if(value !== "background" && value !== "about"){
            setVisibleComponent(false)
            setChangeText(false);
            setloaded(true);
            setTimeout(() => {
                navigate('../' + value, { replace: true });
            }, 1650);
        }
    }

    function handleVisibleTab(event) {
        event.persist();
        setTimeout(() => {
            setVisibleTab(true);
        }, 100)
    };

    return(
        <Div100vh className={classes.root}>
            <div className={classes.container}>
                <motion.div initial={{opacity: 0}} animate={{opacity: visibleComponent ? 1 : 0}}
                    transition={{delay: visibleComponent ? 0.8 : 1.6}} className={classes.video_container}>
                    <Desktop>
                        <img src={DesktopBackground} height="100%" width="100%"/>
                    </Desktop>
                    <Tablet>
                        <img src={TabletBackground} height="100%" width="100%"/>
                    </Tablet>
                    <Mobile>
                        <img src={MobileBackground} height="100%" width="100%"/>
                    </Mobile>
                </motion.div>
                <motion.div initial={{x: "0%"}} animate={{x: visibleComponent ? "100%" : "0%"}} 
                    transition={{duration: .8, delay: 0.8}} className={classes.background_container_intro}>
                        <motion.div layoutId="primary_background" transition={{duration: .8}}
                        variants={animations} className={classes.background}/>
                </motion.div>
                <motion.div className={classes.info_container}>
                    <motion.img layoutId="logo" transition={{duration:.8}} className={classes.img}
                    src={Logo} alt="Le Petite Gastronomique"/>
                    <div className={classes.title}>
                        <motion.span variants={animations} key={language} initial="description_initial" 
                            animate={{opacity: visibleComponent ? 1 : 0}}
                            transition={{duration: .8, delay: visibleComponent && changeText ? 1.6 : 0}}>{AboutDescription[language].title}</motion.span>
                    </div>
                    <div className={classes.description}>
                        <motion.span variants={animations} key={language} initial="description_initial" 
                            animate={{opacity: visibleComponent ? 1 : 0}}
                            transition={{duration: .8, delay: visibleComponent && changeText ? 1.9 : .3}}>{AboutDescription[language].description}</motion.span>
                    </div>
                    <div className={classes.flyer} onClick={() => {window.location.href = `mailto:valram@domory.co`}}>
                        <motion.img className={classes.img} variants={animations} key={language} initial={{opacity: 0}} 
                            animate={{opacity: visibleComponent ? 1 : 0}} src={AboutDescription[language].flyer}
                            transition={{duration: .8, delay: visibleComponent && changeText ? 1.9 : .3}}/>
                    </div>
                </motion.div>
                <motion.div className={classes.language_button} variants={animations}  
                    initial={loaded ? "" : "right_initial_component"} animate={"animated_component"}
                    transition={buttonTransition}>
                        <motion.div layoutId="language_button">
                            <IconButton onClick={(e) => changeLanguage(e)} icon={LanguageIcon[language]}/>
                        </motion.div>
                </motion.div>
                <motion.div className={classes.menu_button} variants={animations}  
                    initial={loaded ? "" : "left_initial_component"} animate={"animated_component"}
                    transition={buttonTransition}>
                        <motion.div layoutId="menu_button">
                            <MobileOrTablet>
                                <IconButton onClick={(e) => handleVisibleTab(e)} icon={MenuIcon}/>
                            </MobileOrTablet>
                        </motion.div>
                </motion.div>
                <Tab isVisible={isDesktop ? true : visibleTab} static={loaded ? true : false} onChange={handleChange}/>   

            </div>

        </Div100vh>
    )
}

export default About
