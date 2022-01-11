import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Div100vh from 'react-div-100vh';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@reach/router";
import { useGlobalState } from 'state-pool';
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';

//Images
import BreakfastMenu from '@images/breakfast_menu.png';
import LunchMenu from '@images/lunch_menu.png';
import DinnerMenu from '@images/dinner_menu.png';
import Logo from '@images/white_logo.png';

//Icons
import MenuIcon from '@icons/menu_white_icon.png';
import CartIcon from '@icons/cart_black_icon.png';

//Components
import CardCategory from '@components/cards/CardCategory';
import CardMenu from '@components/cards/CardMenu';
import Tab from '@components/Tab';
import IconButton from '@components/buttons/_IconButton';
import CartButton from '@components/buttons/CartButton';
import Category from './Category';
import {LanguageIcon as LanguageIcon} from '@shared/GlobalData.js';
import {TitleCategoryCards as TitleCategory} from '@shared/GlobalData.js';
import {SubtitleMenu as SubtitleMenu} from '@shared/GlobalData.js';
import {TitleMenuCategory as TitleMenuCategory} from '@shared/GlobalData.js';

const styles = makeStyles(theme => ({
    root:{
        position: "fixed",
        height: "100%",
        width: "100%",
        backgroundColor: theme.colors.secondary.smoky_black,
    },  
    container:{
        position: "fixed",
        display: "flex",
        backgroundColor: theme.colors.secondary.smoky_black,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
        right: 0,
        [theme.breakpoints.down('sm')]: {
            width: "100%", 
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",    
        },
        [theme.breakpoints.up('lg')]: {
            width: "75%",
        },
        '& $root_background': {
            position: "relative",
            backgroundColor: theme.colors.primary.rich_black,
            height: "100%",
            width: "100%",
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
        '& $main_container': {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            [theme.breakpoints.up('lg')]: {
                fontSize: "5vw",
                paddingLeft: "4vw",
                paddingRight: "4vw",
            },
            '& $text_title': {
                color: theme.colors.secondary.cultured, 
                fontFamily: "Lora",
                fontWeight: "bold",
                textAlign: "center",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "5vw",
                    paddingLeft: "4vw",
                    paddingRight: "4vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "6vw",
                    paddingLeft: "8vw",
                    paddingRight: "8vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "4vh",
                },
            },
            "& $img": {
                position: "relative",
                [theme.breakpoints.down('lg')]: {
                    marginTop: "7%",
                    height: "30%",
                    width:"auto"                 
                },
                [theme.breakpoints.down('sm')]: {
                    marginTop: "10%",
                    height: "25%",
                    width:"auto"  
                },
                [theme.breakpoints.up('lg')]: {
                    marginTop: "5%",
                    width:"auto",
                    height: "30%"
                },
            },
            '& $carousel_container':{
                position:"relative",
                [theme.breakpoints.down('lg')]: {
                    height: "40%",
                    width: "90vw",  
                    paddingBottom: "10%"
                },
                [theme.breakpoints.down('sm')]: {
                    width: "120vw", 
                    height: "45%",
                    paddingBottom: "5%",
                },
                [theme.breakpoints.up('lg')]: {
                    width: "38vw",
                    height: "40%",
                    paddingBottom: "3%",
                    paddingLeft: "5%",
                    paddingRight: "5%"
                },
            },
        },
        '& $card_container': {
            position: "relative",
            height: "96%",
            [theme.breakpoints.down('lg')]: {
                width: "38vw",

            },
            [theme.breakpoints.down('sm')]: {
                width: "50vw",
            },
            [theme.breakpoints.up('lg')]: {
                width: "25vh",
            },
        },
        '& $cart_button':{
            position: "absolute",
            top: "-10vh",
            right: "18vw",
            opacity: 0,
            [theme.breakpoints.up('lg')]: {
                right: "8vw",
            },
        },
        '& $menu_layout':{
            position: "absolute",
            [theme.breakpoints.down('sm')]: {
                bottom: "-50vh",
            },
            [theme.breakpoints.up('sm')]: {
                bottom: "-50vh",
            },
            [theme.breakpoints.up('lg')]: {
                bottom: "-50vh",
            },
        },
    },
    main_container:{},
    carousel_container:{},
    language_button:{},
    menu_button:{},
    text_title:{},
    cart_button: {},
    root_background:{},
    menu_layout: {},
    tab:{},
    card_container:{},
    img: {}
}));

const animations = {
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
        y: "250%",
    },
    animated_component:{
        x: 0,
        y: 0,
    }, 
};

const initialTransition = {
    delay: .2,
    duration: 1.4
}

const titleTransition = {
    delay: 1.4,
    duration: .8,
    ease: [0.17, 0.67, 0.83, 0.67] 
}

const buttonTransition = {
    delay: .8,
    duration: .8,
}

function MenuSelector(props){

    const classes = styles();
    const navigate = useNavigate();
    const [visibleTab, setVisibleTab] = useState(false);
    const [visibleComponent, setVisibleComponent] = useState(true);
    const [loaded, setLoaded] = useGlobalState("loaded");
    const [language, setLanguage] = useGlobalState("language");
    var products = JSON.parse(sessionStorage.getItem('Products'));
    const [state, setState] = useState({
        goToSlide: 0,
        leftCard: "right_initial_component",
        centerCard: "down_initial_component",
        rightCard: "left_initial_component",
        offsetRadius: 2,
        showNavigation: false,
        config: config.slow
    });
    const [touchCard, setTouchCard] = useState(0);

    const isDesktop = useMediaQuery({ minWidth: 992 })

    const MobileOrTablet = ({ children }) => {
        const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileOrTablet ? children : null
    }

    function changeLanguage(){
        setLoaded(true);
        if(language === 2){
            setLanguage(0);
        }else{
            setLanguage(language + 1)
        }
    }

    useEffect(() => {
    }, []);

    let slides = [
        {
          key: 0,
          content:
            <AnimatePresence>
                {visibleComponent && 
                    (<motion.div className={classes.card_container} variants={animations}
                    initial={isDesktop ? "down_initial_component" : state.centerCard} exit={isDesktop ? "down_initial_component" : state.centerCard}
                    animate="animated_component"  transition={loaded ? {duration: .8} : buttonTransition}>
                        <CardCategory photo={BreakfastMenu} text={TitleCategory[language].breakfast} />
                    </motion.div>)
                }
            </AnimatePresence>

        },
        {
          key: 1,
          content:
            <AnimatePresence>
                {visibleComponent && 
                    (<motion.div className={classes.card_container} variants={animations}
                    initial={isDesktop ? "down_initial_component" : state.leftCard} exit={isDesktop ? "down_initial_component" : state.leftCard}
                    animate="animated_component" transition={loaded ? {duration: .8} : buttonTransition}>
                        <CardCategory photo={LunchMenu} text={TitleCategory[language].lunch} />
                    </motion.div>)
                }
            </AnimatePresence>
        },
        {
          key: 2,
          content:
            <AnimatePresence>
                {visibleComponent && 
                    (<motion.div className={classes.card_container} variants={animations}
                        initial={isDesktop ? "down_initial_component" : state.rightCard} exit={isDesktop ? "down_initial_component" : state.rightCard}
                        animate="animated_component" transition={loaded ? {duration: .8} : buttonTransition}>
                            <CardCategory photo={DinnerMenu} text={TitleCategory[language].dinner} />
                    </motion.div>)
                }
            </AnimatePresence>
        },
    ].map((slide, index) => {
    return { ...slide, onClick: () => {
            setLoaded(true);
            if(touchCard === index) handleSelector(index);
            else{
                setTouchCard(index);
                switch (index) {
                    case 0:
                        setState({ 
                            goToSlide: index, 
                            centerCard: "down_initial_component",
                            leftCard: "right_initial_component",
                            rightCard: "left_initial_component",
                        })
                        break;
                    case 1: setState({ 
                        goToSlide: index, 
                        centerCard: "left_initial_component",
                        leftCard: "down_initial_component",
                        rightCard: "right_initial_component",
                    })
                        break;
                    case 2:
                        setState({ 
                            goToSlide: index, 
                            centerCard: "right_initial_component",
                            leftCard: "left_initial_component",
                            rightCard: "down_initial_component",
                        })
                        break;
                    default: break;
                }
            }
        }};
    });

    function handleChange(value) {
        setVisibleTab(false);
        if(value !== "background" && value !== "menu"){
            setVisibleComponent(false);
            setLoaded(true);
            setTimeout(() => {
                navigate('../' + value, { replace: true });
            }, 1450);
        }
    }

    function handleSelector(value) {
        setVisibleComponent(false);
        setLoaded(true);
        setTimeout(() => {
            props.onChange(value);
        }, 1400);
    }

    function handleVisibleTab(event) {
        event.persist();
        setTimeout(() => {
            setVisibleTab(true);
        }, 100)
    };

    const handlers = useSwipeable({
        onSwipedRight: (eventData) => {
            switch (state.goToSlide) {
                case 0:
                    setState({ 
                        goToSlide: 2, 
                        centerCard: "right_initial_component",
                        leftCard: "left_initial_component",
                        rightCard: "down_initial_component",
                    })
                    break;
                case 2: 
                    setState({ 
                        goToSlide: 1, 
                        centerCard: "left_initial_component",
                        leftCard: "down_initial_component",
                        rightCard: "right_initial_component",
                    })
                    break;
                case 1:
                    setState({ 
                        goToSlide: 0, 
                        centerCard: "down_initial_component",
                        leftCard: "right_initial_component",
                        rightCard: "left_initial_component",
                    })
                    break;
                default:
                    break;
            }
            
        },
        onSwipedLeft: (eventData) => {
            switch (state.goToSlide) {
                case 0:
                    setState({ 
                        goToSlide: 1, 
                        centerCard: "left_initial_component",
                        leftCard: "down_initial_component",
                        rightCard: "right_initial_component",
                    })
                    break;
                case 1: 
                    setState({ 
                        goToSlide: 2, 
                        centerCard: "right_initial_component",
                        leftCard: "left_initial_component",
                        rightCard: "down_initial_component",
                    })
                    break;
                case 2:
                    setState({ 
                        goToSlide: 0, 
                        centerCard: "down_initial_component",
                        leftCard: "right_initial_component",
                        rightCard: "left_initial_component",
                    })
                    break;
                default:
                    break;
            }
        },
        ...config,
    });
    
    

    return (
        <Div100vh className={classes.root}>
            <div className={classes.container}>
                <motion.div layoutId="primary_background" 
                    className={classes.root_background} transition={initialTransition}/>
                    <div className={classes.main_container}>
                        <motion.img layoutId="logo" 
                        className={classes.img} src={Logo}
                        transition={loaded ? {duration: .8} : initialTransition} alt="Le Petite Gastronimique"/>
                        <AnimatePresence>
                            {visibleComponent && 
                                (<motion.div className={classes.text_title}
                                    initial="title_initial" animate="title_animated"
                                    exit="title_initial" variants={animations} 
                                    transition={loaded ? {duration: .8, delay: .4} : titleTransition}>
                                        <motion.span key={SubtitleMenu[language].subtitle} initial={{opacity: 0}} exit={{opacity: 0}}
                                            animate={{opacity: 1}} transition={{duration: 1.6}}>
                                            {SubtitleMenu[language].subtitle}
                                        </motion.span>
                                </motion.div>)
                            }
                        </AnimatePresence>
                        <div {...handlers} className={classes.carousel_container}>

                            <Carousel
                            slides={slides}
                            goToSlide={state.goToSlide}
                            offsetRadius={state.offsetRadius}
                            showNavigation={state.showNavigation}
                            animationConfig={state.config}/>

                        </div>
                    </div>
                    <motion.div className={classes.language_button} variants={animations}  
                    initial={loaded ? "" : "right_initial_component"} animate={"animated_component"}
                    transition={buttonTransition}>
                        <motion.div layoutId="language_button">
                            <IconButton onClick={(e) => changeLanguage(e)}
                            icon={LanguageIcon[language]}/>
                        </motion.div>
                    </motion.div>
                    <motion.div className={classes.menu_button} variants={animations}  
                    initial={loaded ? "" : "left_initial_component"} animate={"animated_component"}
                    transition={buttonTransition}>
                        <motion.div layoutId="menu_button">
                        <MobileOrTablet>
                        <IconButton onClick={(e) => handleVisibleTab(e)} 
                                icon={MenuIcon}/>
                        </MobileOrTablet>

                            
                        </motion.div> 
                    </motion.div>
                    
                    <motion.div layoutId="cart_button" className={classes.cart_button} transition={{duration: .8}}>
                        <IconButton items={products.length} icon={CartIcon}/>
                    </motion.div>
               
                <motion.div className={classes.menu_layout}>
                    <CardMenu onChange={handleChange} items={[]} open={false} language={language} level="4" category={props.title} title={TitleMenuCategory[language].entree}/>
                    <CardMenu onChange={handleChange} items={[]} open={false} language={language} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                    <CardMenu onChange={handleChange} items={[]} open={false} language={language} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
                    <CardMenu onChange={handleChange} items={[]} open={false} language={language} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
                </motion.div>

            </div>
            <Tab isVisible={isDesktop ? true : visibleTab} static={loaded ? true : false} onChange={handleChange}/>   


        </Div100vh>
        
    )
}

function Menu(){

    const [selector, setSelector] = useState("MENU");
    const [language, setLanguage] = useGlobalState("language");

    function handleSelector(value){
        switch (value) {
            case "ENG":
                setLanguage(0)
                break;
            case "ES":
                setLanguage(1)
                break;
            case "FR":
                setLanguage(2)
                break;
            default:
                setSelector(value);
                break;
        }
    }

    return(
        <div>
            {selector === "MENU" && <MenuSelector onChange={handleSelector}/>}
            {selector === 0 && <Category title={TitleCategory[language].breakfast} onChange={handleSelector}/>}
            {selector === 1 && <Category title={TitleCategory[language].lunch} onChange={handleSelector}/>}
            {selector === 2 && <Category title={TitleCategory[language].dinner} onChange={handleSelector}/>}
        </div>
        
    )
}

export default Menu
