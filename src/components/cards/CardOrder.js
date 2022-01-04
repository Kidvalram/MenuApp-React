import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";
import { useGlobalState } from 'state-pool';

import LogoTitle from '@images/dark_logo_title.png';
import GoldenIcon from '@images/golden_logo.png';
import DarkIconButton from '@components/buttons/DarkIconButton';
import ClosedIcon from '@icons/closed_black_icon.png';
import BackgroundSubtitle from '@images/background_subtitle.png'
import {TabDescription as TabDescription} from '@shared/GlobalData.js';
import {CardOrderReady as CardOrderReady} from '@shared/GlobalData.js';

const styles = makeStyles(theme => ({
    root:{
        position: "absolute",
        height: "100%",
        width: "100%", 
        top: 0,
        right: 0,
        '& $shadow_background': {
            position: "fixed",
            height: "100%",
            width: "100%",  
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(2px)",
            [theme.breakpoints.up('lg')]: {
                width: "80%",
                right: 0,
            },
        },
        '& $container': {
            position: "fixed",
            height: "100%",
            width: "100%",
            [theme.breakpoints.up('lg')]: {
                width: "80%",
                right: 0,
            },
            '& $card':{
                position: "relative",
                height: "90%",
                width: "90%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                borderRadius: "20px",
                boxShadow: ".1px 15px 15px #000000",        
                background: theme.colors.primary.alabaster,
                [theme.breakpoints.up('lg')]: {
                    width: "55%",
                    right: 0,
                },
                '& $card_container':{
                    position: "relative",
                    height: "80%",
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "3vh",
                    '& $logo':{
                        position: "relative",
                        height: "auto",
                        width: "80%",
                        paddingTop: "5vh",
                        [theme.breakpoints.up('lg')]: {
                            width: "50%",
                        },
                        '& $img':{
                            height: "auto",
                            width: "100%",
                        },
                    },
                    '& $subtitle': {
                        position: "relative",
                        height: "auto",
                        width: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center",
                        '& $span':{
                            position: "relative",
                            paddingLeft: "10vw",
                            paddingRight: "10vw",
                            fontFamily: "WorkSans",
                            fontWeight: "bold",
                            color: theme.colors.primary.rich_black,
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "5vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "5.5vw",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "3.5vh",
                                paddingRight: "8vh",
                                paddingLeft: "8vh",
                            },
                        },
                        '& $img': {
                            position: "absolute",
                            height: "auto",
                            width: "100%",
                            objectFit: "cover", 
                        }
                    },
                    '& $info_container': {
                        position: "relative",
                        display: "flex",
                        width: "90%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "column",
                        '& $icon': {
                            position: "absolute",
                            top: 0,
                            height: "auto",
                            objectFit: "cover",
                            [theme.breakpoints.down('lg')]: {
                                width: "55%",
                            },
                            [theme.breakpoints.down('sm')]: {
                                width: "65%",
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: "45%",
                            },
                        },
                        '& $product':{
                            position: "relative",
                            width: "100%",
                            height: "auto",
                            fontFamily: "Ruluko",
                            display: "box",
                            paddingTop: "1.5vw",
                            color: theme.colors.primary.rich_black,
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "3vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "3.6vw",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "2.5vh",
                                paddingTop: "0.5vh",
                            },
                            '& $line_container': {
                                boxFlex: 9.0,
                                '& $line': {
                                    borderBottom: "2px dotted #161C26",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    height: "1.5vh",
                                    margin: "0 1px 0 1px",
                                },
                            },
                        },
                    },
                    '& $advice_container':{
                        position: "absolute",
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center",
                        fontFamily: "Ruluko",
                        [theme.breakpoints.down('lg')]: {
                            width: "70%",
                            bottom: "2vw",
                        },
                        [theme.breakpoints.down('sm')]: {
                            width: "90%",
                            bottom: "4vw",
                        },
                        [theme.breakpoints.up('lg')]: {
                            width: "60%",
                            bottom: 0,

                        },
                        '& $advice_title':{
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "6.5vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "7.5vw",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "4.7vh",
                            },
                        },
                        '& $advice_subtitle': {
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "4vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "5vw",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "3.2vh",
                            },
                        },
                    },
                },
                '& $down_line': {
                    position: "absolute",
                    width: "100%",
                    height: "2%",
                    borderBottom: "2vh solid #161C26",
                    bottom: "8%",
                    [theme.breakpoints.up('lg')]: {
                        bottom: "6%",
                    },
                },
                '& $top_line': {
                    width: "100%",
                    height: "8%",
                    borderBottom: "2vh solid #161C26",
                    top: 3,
                    [theme.breakpoints.up('lg')]: {
                        top: 4,
                    },
                    position: "absolute",
                },
                '& $closed_button':{
                    position: "absolute",
                    top: "1vw",
                    right: "3vw",
                    [theme.breakpoints.up('lg')]: {
                        top: "1vh",
                        right: "3vh",
                    },
                },
            },
        },
    },
    card: {},
    card_container: {},
    advice_container:{},
    advice_title:{},
    advice_subtitle: {},
    img:{},
    container: {},
    closed_button: {},
    shadow_background: {},
    info_container: {},
    title: {},
    subtitle: {},
    description: {},
    down_line: {},
    top_line: {},
    logo:{},
    span: {},
    subtitle:{},
    icon: {},
    product:{},
    line: {},
    line_container: {}
}));

const animations = {
    initial_background: {
        opacity: 0,
    },
    animate_background:{
        opacity: 1,
    },
    left_animated_card:{
        x: "-150%",
    },
    right_animated_card:{
        x: "150%",
    },
    animated_component:{
        x: 0,
        y: 0,
    }, 
};

const backgroundTransition = {
    duration: .8
}

const cardTransition = {
    duration: 1.6,
    type: "spring",
}

function CardOrder(props) {

    const classes = styles({order: props.order});
    const [language, setLanguage] = useGlobalState("language");

    function handleChange(event, value) {
        event.persist();
        props.onChange(value);
    }

    const truncate = (input) => input.length > 30 ? `${input.substring(0, 30)}...` : input;

    return (
        <div className={classes.root}>
            <motion.div initial="initial_background" variants={animations} 
            animate="animate_background" transition={backgroundTransition} 
            exit="initial_background" className={classes.shadow_background}/>
            <motion.div initial="right_animated_card" variants={animations} 
                animate="animated_component" transition={cardTransition} 
                exit="right_animated_card" className={classes.container}>
                <div className={classes.card}>
                    <div className={classes.top_line}/>
                    <div className={classes.down_line}/>
                    <div className={classes.closed_button}>
                        <DarkIconButton size="10vw" icon={ClosedIcon} onClick={(e) => handleChange(e,"closed")}/>
                    </div>
                    <div className={classes.card_container}>
                        <div className={classes.logo}>
                            <img className={classes.img} src={LogoTitle}/>
                        </div>
                        <div className={classes.subtitle}>
                            <span className={classes.span}>{TabDescription[language].order}</span>
                            <img className={classes.img} src={BackgroundSubtitle}/>
                        </div>
                        <div className={classes.info_container}>
                            {props.item.length > 0 && (props.item.map((i, id) => {
                                return <div key={id} className={classes.product}>
                                
                                    {language === 0 && <span>{truncate(i.title.en)} x{i.quantity}</span>}
                                    {language === 1 && <span>{truncate(i.title.es)} x{i.quantity}</span>}
                                    {language === 2 && <span>{truncate(i.title.fr)} x{i.quantity}</span>}
                                    <div className={classes.line_container}>
                                        <div className={classes.line}/>
                                    </div>
                                    <span>{(i.quantity * parseFloat(i.price.replace('€',''))).toFixed(2)}€</span>
                                </div>
                            }))}
                            <img className={classes.icon} src={GoldenIcon}/>
                        </div>
                        <div className={classes.advice_container}>
                            <span className={classes.advice_title}>{CardOrderReady[language].title}</span>
                            <span className={classes.advice_subtitle}>{CardOrderReady[language].subtitle}</span>
                        </div>
                    </div>
                   

                </div>
            </motion.div>
        </div>
    )
}

export default CardOrder
