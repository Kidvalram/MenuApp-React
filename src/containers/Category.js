import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import { motion, AnimateSharedLayout, useCycle, AnimatePresence } from "framer-motion";
import { useNavigate } from "@reach/router";
import {useGlobalState} from 'state-pool';
import { useMediaQuery } from 'react-responsive';

//Images
import Logo from '@images/golden_logo_no_title.png';

//Icons
import CartIcon from '@icons/cart_black_icon.png';
import BackIcon from '@icons/back_black_icon.png';

//Components
import Tab from '@components/Tab';
import DarkIconButton from '@components/buttons/DarkIconButton';
import CardMenu from '@components/cards/CardMenu';
import CardFeatures from "@components/cards/CardFeatures";
import {LanguageIcon as LanguageIcon} from '@shared/GlobalData.js';
import {TitleMenuCategory as TitleMenuCategory} from '@shared/GlobalData.js';

//Foods
import {Entree as BreakfastEntree} from '@shared/BreakfastData.js';
import {Main as BreakfastMain} from '@shared/BreakfastData.js';
import {Dessert as BreakfastDessert} from '@shared/BreakfastData.js';
import {Drinks as BreakfastDrinks} from '@shared/BreakfastData.js';

const styles = makeStyles(theme => ({
    root:{
        position: "relative",
        height: "100%",
        width: "100%",
        backgroundColor: theme.colors.secondary.smoky_black,
        [theme.breakpoints.down('lg')]: {
            width: "100%",  
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",  
        },
        [theme.breakpoints.up('lg')]: {
            width: "80%", 
            paddingLeft: "20%" 
        },
        '& $background': {
            position: "absolute",
            height: "100%",
            width: "100%",
            [theme.breakpoints.up('lg')]: {
                width: "80%",  
            },
        },
        '& $menu_container':{
            position: "fixed",
            bottom: 0,
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            alignContent: "center",
            [theme.breakpoints.up('lg')]: {
                width: "80%",  
            },
            '& $logo_section': {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                width: "100%",
                height: "45vh",
                opacity: 0.7,
                [theme.breakpoints.up('lg')]: {
                    bottom: "-25vh",
                },
                '& $text_title': {
                    position: "relative",
                    textAlign: "center",
                    color: theme.colors.secondary.golden_brown, 
                    fontFamily: "WorkSans",
                    fontWeight: "bold",
                    paddingBottom: "5vh",
                    [theme.breakpoints.down('lg')]: {
                        fontSize: "8vw",
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "9vw",
                    },
                    [theme.breakpoints.up('lg')]: {
                        paddingBottom: "1vh",
                        fontSize: "7vh",
                    },
                },
            },
        },
        '& $cart_button':{
            position: "absolute",
            top: "3vw",
            right: "18vw",
            [theme.breakpoints.up('lg')]: {
                top: "3vh",
                right: "15vh",
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
        '& $back_button':{
            position: "absolute",
            top: "3vw",
            left: "3vw",
            [theme.breakpoints.up('lg')]: {
                top: "3vh",
                left: "3vh",
                paddingLeft: "20%"
            },
        },
        '& $categories_section': {
            display: "flex",
            flexDirection: "column"
        }
    },
    navbar:{},
    menu_container:{},
    navbar_right_section: {},
    language_button: {},
    back_button: {},
    cart_button: {},
    logo_section: {},
    logo: {},
    text_title: {},
    categories_section: {},
    background: {},
    four_menu: { 
        position: "relative", 
        width: "100%", 
        height: "60vw",
        [theme.breakpoints.up('lg')]: {
            height: "60vh",        
        },
    },
    three_menu: { 
        position: "relative", 
        width: "100%", 
        height: "45vw",
        [theme.breakpoints.up('lg')]: {
            height: "45vh",        
        },
    },
    two_menu: { 
        position: "relative", 
        width: "100%", 
        height: "30vw",
        [theme.breakpoints.up('lg')]: {
            height: "30vh",        
        },
    },
    one_menu: { 
        position: "relative", 
        width: "100%", 
        height: "15vw",
        [theme.breakpoints.up('lg')]: {
            height: "15vh",        
        },
    },
}));

const animations = {
    background_initial: {
        backgroundColor: "#161C26"
    },
    background_animated: {
        backgroundColor: "#E9E4DA"
    },
    title_initial: {
        opacity: 0, 
        scale:0.9
    },
    title_animated: {
        opacity: 1, 
        scale: 1
    },
    left_initial_component:{
        x: "-150%",
    },
    right_initial_component:{
        x: "150%",
    },
    down_initial_component:{
        y: "150%",
    },
    animated_component:{
        x: 0,
        y: 0,
    }, 
};

const titleTransition = {
    delay: 1.2,
    duration: .8,
    ease: [0.17, 0.67, 0.83, 0.67] 
}

const initialTransition = {
    delay: .2,
    duration: 1.4
}

const buttonTransition = {
    delay: .8,
    duration: .8,
}

let loaded = false;

function DefaultCategory(props) {

    const classes = styles();
    const [visibleComponent, setVisibleComponent] = useState(true);
    const [language, setLanguage] = useGlobalState("language");
    const navigate = useNavigate();
    var products = JSON.parse(sessionStorage.getItem('Products'));

    const isDesktop = useMediaQuery({ minWidth: 992 })

    const MobileOrTablet = ({ children }) => {
        const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileOrTablet ? children : null
    }

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }
    
    // const navigate = useNavigate();
    // const [visibleTab, setVisibleTab] = useState(false);
    // const [visibleComponent, setVisibleComponent] = useState(true);
    // const [loaded, setloaded] = useGlobalState("loaded");

    function handleChange(value) {
        loaded = true;
        props.onChange(value);
    }

    function handleBack(event,value){
        event.persist();
        loaded = false;
        props.onChange(value);
    }

    function handleLanguage(){
        if(language === 2){
            setLanguage(0);
        }else{
            setLanguage(language + 1)
        }
        
        switch (language) {
            case 0:
                props.onChange("ENG");
                break;
            case 1:
                props.onChange("ENG");
                break;
            case 2:
                props.onChange("FR");
                break;
            default:
                break;
        }
    }

    return (
        <Div100vh>  
            <div className={classes.root}>
                <motion.div className={classes.background} layoutId="primary_background" initial={loaded ? "background_animated" : "background_initial"} 
                animate={loaded ? "" : "background_animated"}
                variants={animations}  transition={initialTransition}/>   
                <div className={classes.menu_container}>
                    <div className={classes.logo_section}>
                        <motion.img layoutId="logo" src={Logo} width="auto" height="100%" style={{position: "absolute"}}
                        transition={initialTransition} alt="Le Petite Gastronimique"/>
                        <AnimatePresence>
                            {visibleComponent && 
                                (<motion.span className={classes.text_title}
                                    initial={loaded ? "" : "title_initial"} 
                                    animate={loaded ? "" : "title_animated"}
                                    exit="title_initial" variants={animations} 
                                    transition={titleTransition}>
                                    <motion.span key={props.title} initial={{opacity: 0}} exit={{opacity: 0}}
                                    animate={{opacity: 1}} transition={{duration: 1.6}}>
                                        {props.title}
                                    </motion.span>
                                </motion.span>)
                            }
                        </AnimatePresence>
                    </div>
                    <div className={classes.four_menu}/>
                </div>      
                <motion.div layoutId="menu_button" className={classes.back_button} transition={{ duration: .8}}>
                    <DarkIconButton icon={BackIcon}
                    onClick={(e) => handleBack(e,"MENU")}/>
                </motion.div>
                <motion.div layoutId="language_button" transition={{ duration: .8}} 
                className={classes.language_button}>
                    <DarkIconButton onClick={(e) => handleLanguage(language)} 
                    icon={LanguageIcon[language]}/>
                </motion.div>  
                <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                    <DarkIconButton items={products.length} icon={CartIcon}
                    onClick={(e) => handleBack(e,"order")}/>
                </motion.div>     
                <motion.div className={classes.menu_container} variants={animations} initial={loaded ? "" : "down_initial_component"}
                    exit="down_initial_component" animate="animated_component" transition={buttonTransition}>
                    <CardMenu onChange={handleChange} items={BreakfastEntree} open={false} language={language} level="4" category={props.title} title={TitleMenuCategory[language].entree}/>
                    <CardMenu onChange={handleChange} items={BreakfastMain} open={false} language={language} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                    <CardMenu onChange={handleChange} items={BreakfastDessert} open={false} language={language} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
                    <CardMenu onChange={handleChange} items={BreakfastDrinks} open={false} language={language} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
                </motion.div>
                
                <Desktop>
                <Tab isVisible={true} static={true} onChange={handleChange}/>
            </Desktop> 
            </div>

        </Div100vh>
    )
}

function EntreeCategory(props) {

    const classes = styles();
    const [language, setLanguage] = useGlobalState("language");
    var products = JSON.parse(sessionStorage.getItem('Products'));

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
    
    function handleChange(value) {
        props.onChange(value);
    }
   
    return (
        <Div100vh >
            <div className={classes.root}>
                <div className={classes.background} style={{backgroundColor: "#E9E4DA"}}/>               
                <motion.div layoutId="language_button" className={classes.language_button}
                    transition={{ duration: .8}}>
                    <DarkIconButton size="12vw" icon={LanguageIcon[language]}/>
                </motion.div>
                <div className={classes.menu_container}>
                    <div className={classes.logo_section}>
                        <motion.img layoutId="logo" src={Logo} width="auto" height="100%" 
                        style={{position: "absolute"}} alt="Le Petite Gastronimique"/>
                        <span className={classes.text_title}>
                            {props.title}
                        </span>
                    </div>
                    <div className={classes.four_menu}/>
                </div>
                <motion.div layoutId="menu_button" className={classes.back_button} transition={{ duration: .8}}>
                    <DarkIconButton size="12vw" icon={BackIcon}/>
                </motion.div>  
                <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                    <DarkIconButton items={products.length} icon={CartIcon}
                    onClick={(e) => handleBack(e,"order")}/>
                </motion.div>  
                <CardMenu onChange={handleChange} padding={isMobileOrTablet ? "54vw" : "30vh"} items={BreakfastEntree} level="4" open={true} language={language} category={props.title} title={TitleMenuCategory[language].entree}/>
                <div className={classes.menu_container}>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastMain} language={language} level="3" open={false} category={props.title} title={TitleMenuCategory[language].main}/>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastDessert} language={language} level="2" open={false} category={props.title} title={TitleMenuCategory[language].dessert}/>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastDrinks} language={language} level="1" open={false} category={props.title} title={TitleMenuCategory[language].drinks}/>
                </div>  
            </div>  
            <Desktop>
                <Tab isVisible={true} static={true} onChange={handleChange}/>
            </Desktop> 
            
        </Div100vh>
    )
}

function MainCategory(props) {

    const classes = styles();
    const [language, setLanguage] = useGlobalState("language");
    var products = JSON.parse(sessionStorage.getItem('Products'));

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })

    function handleChange(value) {
        props.onChange(value);
    }
   
    return (
        <Div100vh >  
            <div className={classes.root}>
                <div className={classes.background} style={{backgroundColor: "#E9E4DA"}}/>
                <motion.div layoutId="language_button" className={classes.language_button}
                    transition={{ duration: .8}}>
                    <DarkIconButton size="12vw" icon={LanguageIcon[language]}/>
                </motion.div>
                <div className={classes.menu_container}>
                    <div className={classes.logo_section}>
                        <motion.img layoutId="logo" src={Logo} width="auto" height="100%" 
                        style={{position: "absolute"}} alt="Le Petite Gastronimique"/>
                        <span className={classes.text_title}>
                            {props.title}
                        </span>
                    </div>
                    <div className={classes.four_menu}/>
                </div>
                <motion.div layoutId="menu_button" className={classes.back_button} transition={{ duration: .8}}>
                    <DarkIconButton size="12vw" icon={BackIcon}/>
                </motion.div>
                <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                    <DarkIconButton items={products.length} icon={CartIcon}
                    onClick={(e) => handleBack(e,"order")}/>
                </motion.div> 
                <div className={classes.menu_container}>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastEntree} language={language} open={false} level="4" category={props.title} title={TitleMenuCategory[language].entree}/>
                    <div className={classes.three_menu}/>
                </div>
                <CardMenu onChange={handleChange} padding={isMobileOrTablet ? "36vw" : "20vh"} items={BreakfastMain} language={language} open={true} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                <div className={classes.menu_container}>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastDessert} language={language} open={false} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
                    <CardMenu onChange={handleChange} padding="4vw" items={BreakfastDrinks} language={language} open={false} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
                </div>
            </div>
            <Desktop>
                <Tab isVisible={true} static={true} onChange={handleChange}/>
            </Desktop> 
            
        </Div100vh>
    )
}

function DessertCategory(props) {

    const classes = styles();
    const [language, setLanguage] = useGlobalState("language");
    var products = JSON.parse(sessionStorage.getItem('Products'));

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }
    
    const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })

    function handleChange(value) {
        props.onChange(value);
    }
   
    return (
        <Div100vh className={classes.root}>            
            <div className={classes.background} style={{backgroundColor: "#E9E4DA"}}/>
            <motion.div layoutId="language_button" className={classes.language_button}
                transition={{ duration: .8}}>
                <DarkIconButton size="12vw" icon={LanguageIcon[language]}/>
            </motion.div>
            <div className={classes.menu_container}>
                <div className={classes.logo_section}>
                    <motion.img layoutId="logo" src={Logo} width="auto" height="100%" 
                    style={{position: "absolute"}} alt="Le Petite Gastronimique"/>
                    <span className={classes.text_title}>
                        {props.title}
                    </span>
                </div>
                <div className={classes.four_menu}/>
            </div>
            <motion.div layoutId="menu_button" className={classes.back_button} transition={{ duration: .8}}>
                <DarkIconButton size="12vw" icon={BackIcon}/>
            </motion.div>
            <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                <DarkIconButton items={products.length} icon={CartIcon}
                onClick={(e) => handleBack(e,"order")}/>
            </motion.div> 
            <div className={classes.menu_container}>
                <CardMenu onChange={handleChange} padding="4vw" items={BreakfastEntree} language={language} level="4" open={false} category={props.title} title={TitleMenuCategory[language].entree}/>
                <CardMenu onChange={handleChange} padding="4vw" items={BreakfastMain} open={false} language={language} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                <div className={classes.two_menu}/>
            </div>
            <CardMenu onChange={handleChange} padding={isMobileOrTablet ? "18vw" : "18vh"} items={BreakfastDessert} open={true} language={language} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
            <div className={classes.menu_container}>
                <CardMenu onChange={handleChange} padding="4vw" items={BreakfastDrinks} open={false} language={language} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
            </div>
            <Desktop>
                <Tab isVisible={true} static={true} onChange={handleChange}/>
            </Desktop>         
        </Div100vh>
    )
}

function DrinksCategory(props) {

    const classes = styles();
    const [language, setLanguage] = useGlobalState("language");
    var products = JSON.parse(sessionStorage.getItem('Products'));

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }
    
    const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })

    function handleChange(value) {
        props.onChange(value);
    }

    return (
        <Div100vh className={classes.root}>            
            <div className={classes.background} style={{backgroundColor: "#E9E4DA"}}/>
            <motion.div layoutId="language_button" className={classes.language_button}
                transition={{ duration: .8}}>
                <DarkIconButton size="12vw" icon={LanguageIcon[language]}/>
            </motion.div>
            <div className={classes.menu_container}>
                <div className={classes.logo_section}>
                    <motion.img layoutId="logo" src={Logo} width="auto" height="100%" 
                    style={{position: "absolute"}} alt="Le Petite Gastronimique"/>
                    <span className={classes.text_title}>
                        {props.title}
                    </span>
                </div>
                <div className={classes.four_menu}/>
            </div>
            <motion.div layoutId="menu_button" className={classes.back_button} transition={{ duration: .8}}>
                <DarkIconButton size="12vw" icon={BackIcon}/>
            </motion.div>
            <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                <DarkIconButton items={products.length} icon={CartIcon}
                onClick={(e) => handleBack(e,"order")}/>
            </motion.div>
            <div className={classes.menu_container}>
                <CardMenu open={false} padding="4vw" items={BreakfastEntree} onChange={handleChange} language={language} level="4" category={props.title} title={TitleMenuCategory[language].entree}/>
                <CardMenu open={false} padding="4vw" items={BreakfastMain} onChange={handleChange} language={language} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                <CardMenu open={false} padding="4vw" items={BreakfastDessert} onChange={handleChange} language={language} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
                <div className={classes.one_menu}/>
            </div>
            <CardMenu onChange={handleChange} padding={isMobileOrTablet ? "4vw" : "5vh" } items={BreakfastDrinks} open={true} language={language} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
            <Desktop>
                <Tab isVisible={true} static={true} onChange={handleChange}/>
            </Desktop>   
        </Div100vh>
    )
}


function Category(props) {

    const [screen, setScreen] = useState(0);
    const [card, setCard] = useState(false);
    const [item, setItem] = useState([]);
    const navigate = useNavigate();

    function handleChange(value) {
        if (typeof value === 'string') {
            switch (value) {
                case "closed":
                    setTimeout(() => {
                        setScreen(0);
                    }, 100);
                    break;
                case "order":
                    navigate('../' + "order", { replace: true });
                    break; 
                case "open 4":
                    setScreen(1);
                    break;
                case "open 3":
                    setScreen(2);
                    break;
                case "open 2":
                    setScreen(3);
                    break;             
                case "open 1":
                    setScreen(4);
                    break; 
                case "MENU":
                    props.onChange(value);
                    break;               
                default:
                    break;
            }
        }else{
            setItem(value);
            setCard(true);
        }
    }

    function handleCard(value) {
        if (typeof value === 'string') {
            switch (value) {
                case "closed":
                    setTimeout(() => {
                        setCard(false);
                    }, 100);
                    break;     
                default:
                    break;
            }
        }else{
            console.log("another type " + value);
        }
    }

    return (
        <div>
            <motion.div>
                {screen === 0 && <DefaultCategory title={props.title} onChange={handleChange}/>}
                {screen === 1 && <EntreeCategory title={props.title} onChange={handleChange}/>}
                {screen === 2 && <MainCategory title={props.title} onChange={handleChange}/>}
                {screen === 3 && <DessertCategory title={props.title} onChange={handleChange}/>}
                {screen === 4 && <DrinksCategory title={props.title} onChange={handleChange}/>}
                <AnimatePresence>
                    {card && <CardFeatures item={item} onChange={handleCard}/>}
                </AnimatePresence>
            </motion.div>    
        </div>
    )
}

export default Category
