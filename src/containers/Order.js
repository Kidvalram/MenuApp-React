import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from 'state-pool';
import ReactPlayer from 'react-player'
import { useNavigate } from "@reach/router";
import Rive from 'rive-react';
import { useMediaQuery } from 'react-responsive';

//Components
import Tab from '@components/Tab';
import DarkIconButton from '@components/buttons/DarkIconButton';
import ConfirmButton from '@components/buttons/ConfirmButton';
import {LanguageIcon as LanguageIcon} from '@shared/GlobalData.js';
import {TabDescription as TabDescription} from '@shared/GlobalData.js';
import {TextOrderButton as TextOrderButton} from '@shared/GlobalData.js';
import {TextOrderNoProducts as TextOrderNoProducts} from '@shared/GlobalData.js';
import {TitleMenuCategory as TitleMenuCategory} from '@shared/GlobalData.js';
import CardProduct from '@components/cards/CardProduct.js';
import CardFeatures from "@components/cards/CardFeatures";
import CardOrder from "@components/cards/CardOrder";
import CardMenu from '@components/cards/CardMenu';

//Icons
import MenuIcon from '@icons/menu_white_icon.png';

//Images
import OrderMenu from '@images/order_menu.png';
import Logo from '@images/white_logo.png';
import { display, height } from '@mui/system';

//Rive
import Bag from '@rive/bag.riv';

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
    },
    container:{
        position: "relative",
        display: "flex",
        backgroundColor: theme.colors.secondary.smoky_black,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-end",
        alignItems: "flex-end",
        height: "100%",
        width: "100%",
        '& $background': {
            position: "fixed",
            height: "100%",
            width: "100%",
            right: 0,
            background: theme.colors.primary.rich_black,
            [theme.breakpoints.up('lg')]: {
                width: "80%",
            },
        },
        '& $products_container':{
            position: "absolute",
            height: "65%",
            width: "100%",
            bottom: 0,
            [theme.breakpoints.up('lg')]: {
                width: "80%",
            },
            '& $products': {
                position: "sticky", 
                height: "auto",
                width: "100%",
                paddingTop: "15%",
                paddingBottom: "25%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                [theme.breakpoints.down('lg')]: {
                    gap: "4vh",
                },
                [theme.breakpoints.down('sm')]: {
                    gap: "1vh",
                },
                [theme.breakpoints.up('lg')]: {
                    gap: "9vh",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingTop: "8%",
                    paddingBottom: "15%",
                }, 
            }
        },
        '& $image_container':{
            position: "fixed",
            height: "35%",
            width: "100%",
            right: 0,
            [theme.breakpoints.up('lg')]: {
                width: "80%",
            },
            '& $img': {
                height: "100%",
                width: "100%",
                objectFit: "cover"
            },
            '& $title': {
                position: "absolute",
                height: "30%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                color: theme.colors.secondary.smoky_black, 
                fontFamily: "WorkSans",
                fontWeight: "bold",
                textAlign: "center",
                boxShadow: ".1px 10px 10px #000000",     
                bottom: "-15%",
                borderRadius: "20px",
                backdropFilter: "blur(7px)",
                backgroundColor: theme.colors.button.light_background,
                [theme.breakpoints.down('lg')]: {
                    fontSize: "5.5vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "6vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "4.5vh",
                }, 
            },
        },
        '& $animation_container': {
            position: "absolute",
            height: "60%",
            width: "100%",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            [theme.breakpoints.up('lg')]: {
                width: "80%",
            }, 
            '& $animation':{
                position: "relative",
                height: "40%",
                width: "auto",
            },
            '& $animation_text':{
                position: "relative",
                height: "auto",
                width: "70%",
                fontFamily: "Work Sans",
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.secondary.cultured, 
                [theme.breakpoints.down('lg')]: {
                    fontSize: "6vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "6.5vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "5vh",
                }, 
            }
        },
        '& $logo_container':{
            position: "absolute",
            height: "100%",
            top: "-80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            [theme.breakpoints.up('lg')]: {
                top: "-100%",
                width: "80%",
            },
        },
        '& $order_button_container':{
            position: "fixed",
            height: "10%",
            width: "100%",
            bottom: 0,
            right: 0,
            background: theme.colors.primary.rich_black,
            borderRadius: "20px 20px 0px 0px",
            boxShadow: " 0px -3px 3px #000",
            [theme.breakpoints.up('lg')]: {
                width: "80%",
            },
        },
        '& $menu_button':{
            position: "fixed",
            top: "3vw",
            left: "3vw",
        },
        '& $language_button':{
            position: "fixed",
            top: "3vw",
            right: "3vw",
            [theme.breakpoints.up('lg')]: {
                top: "3vh",
                right: "3vh",
            },
        },
        '& $menu_layout':{
            position: "fixed",
            bottom: "-60vh",
        },

    },
    root_container:{},
    background: {},
    menu_button:{},
    language_button:{},
    image_container:{},
    products_container:{},
    products:{},
    order_button:{},
    img: {},
    title: {},
    logo: {},
    logo_container:{},
    order_button_container:{},
    animation_container: {},
    animation:{},
    animation_text:{},
    menu_layout: {},
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
        y: "200%",
    },
    top_initial_component:{
        y: "-150%",
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

const initialTransition = {
    delay: .2,
    duration: 1.4
}

function Order(props) {

    var products = JSON.parse(sessionStorage.getItem('Products'));
    const classes = styles({products: products.length});
    const [loaded, setLoaded] = useGlobalState("loaded");
    const [visibleTab, setVisibleTab] = useState(false);
    const [item, setItem] = useState(null);
    const [visibleComponent, setVisibleComponent] = useState(true);
    const [language, setLanguage] = useGlobalState("language");
    const [card, setCard] = useState(false);
    const [order, setOrder] = useState(false);
    var totalPrice = 0;
    const navigate = useNavigate();

    var listItems = [];

    const isDesktop = useMediaQuery({ minWidth: 992 })

    if(products.length > 0){
        products.map((i) => {
            totalPrice = totalPrice + parseFloat(i.price.replace('€',''));
        });

        products.forEach(a => {
            if (!listItems.find(v => JSON.stringify(v.title.en) === JSON.stringify(a.title.en))) listItems.push(a);
            else {
                listItems.find( v => JSON.stringify(v.title.en) === JSON.stringify(a.title.en)).quantity += 1;
            }
        });
    }

    useEffect(() => {
        if(products.length > 0){
            products.map((i) => {
                totalPrice = totalPrice + parseFloat(i.price.replace('€',''));
            });
    
            products.forEach(a => {
                if (!listItems.find(v => JSON.stringify(v.title.en) === JSON.stringify(a.title.en))) listItems.push(a);
                else {
                    listItems.find( v => JSON.stringify(v.title.en) === JSON.stringify(a.title.en)).quantity += 1;
                }
                
            });
        }
        
    }, [products])

    function handleVisibleTab(event) {
        event.persist();
        setTimeout(() => {
            setVisibleTab(true);
        }, 100)
    };

    function handleCard(value) {
        if (typeof value === 'string') {
            switch (value) {
                case "closed":
                    setOrder(false);
                    setCard(false);
                    break;           
                default:
                    break;
            }
        }else{
            console.log("another type " + value);
        }
    }

    function handleChange(value) {
        setVisibleTab(false);
        if(value !== "background" && value !== "order"){
            setVisibleComponent(false);
            setLoaded(true);
            setTimeout(() => {
                navigate('../' + value, { replace: true });
            }, 1650);
        }
    }

    function changeLanguage(){
        if(language === 2){
            setLanguage(0);
        }else{
            setLanguage(language + 1)
        }
    }

    function handleCardProduct(value) {
        setItem(value);
        setCard(true);
    }

    function handleOrder() {
        setOrder(true);
    }

    return (
        <Div100vh className={classes.root}>
            <div className={classes.container}>
                <motion.div className={classes.background} layoutId="primary_background" 
                transition={initialTransition}/> 
                <motion.div className={classes.logo_container}>
                    <motion.img layoutId="logo" style={{position: "relative"}}
                        height="auto" width="20%" src={Logo} transition={{duration:1.2}}
                        alt="Le Petite Gastronimique"/>
                </motion.div>            
                    
                <AnimatePresence>
                {visibleComponent && products.length > 0 && (
                            <motion.div className={classes.products_container}>
                            <motion.div variants={animations} transition={loaded ? {duration: 1.2} : initialTransition}
                            initial="down_initial_component" exit="down_initial_component"
                            animate="animated_component" className={classes.products}>
                                {listItems.length > 0 && (listItems.map((i, id) => {
                                    return <CardProduct onChange={handleCardProduct} key={id} title={i.title} 
                                            price={i.price} description={i.description} thumb={i.thumb} language={language}
                                            image={i.image} id={id} quantity={i.quantity}/>
                                }))}
                            </motion.div>
                            </motion.div>
                        )}
                </AnimatePresence>

                <motion.div variants={animations} transition={{duration: .8}}
                    initial="top_initial_component"
                    animate={visibleComponent ? "animated_component": "top_initial_component"} 
                    className={classes.image_container}>
                    <motion.img src={OrderMenu} className={classes.img}/>
                    <div className={classes.title}>
                        <motion.span key={TabDescription[language].order}
                        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            {TabDescription[language].order}
                        </motion.span>
                    </div>  
                </motion.div>
                    
                {products.length > 0 && (
                        <motion.div className={classes.order_button_container} variants={animations} 
                        transition={loaded ? {duration: .8} : initialTransition}
                        initial="down_initial_component" animate={visibleComponent ? "animated_component" : "down_initial_component"}>
                            <ConfirmButton text={TextOrderButton[language].next + " • " + totalPrice.toFixed(2) + "€"}
                            onClick={() => handleOrder()}  />
                        </motion.div>)}
                <AnimatePresence>
                    {visibleComponent && products.length < 1 && (
                        <motion.div className={classes.animation_container} variants={animations} 
                        transition={loaded ? {duration: .8} : { delay: 1, duration: .8}} exit={{opacity: 0}}
                        initial={{opacity: 0}}animate={{opacity: 1}}>
                            <div className={classes.animation}>
                                <Rive src={Bag}/>
                            </div>
                            <motion.span key={TextOrderNoProducts[language].text} exit={{opacity: 0}}
                            initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}}
                            className={classes.animation_text}>{TextOrderNoProducts[language].text}</motion.span>                    
                        </motion.div>)}
                </AnimatePresence>
                <motion.div className={classes.menu_button} variants={animations}  
                initial={loaded ? "" : "left_initial_component"} animate="animated_component"
                transition={buttonTransition}>
                    <motion.div layoutId="menu_button">
                        <DarkIconButton onClick={(e) => handleVisibleTab(e)} 
                        size={"12vw"} icon={MenuIcon}/>
                    </motion.div> 
                </motion.div>
                    
                <motion.div className={classes.language_button} variants={animations}  
                initial={loaded ? "" : "right_initial_component"} animate={"animated_component"}
                transition={buttonTransition}>
                    <motion.div layoutId="language_button">
                        <DarkIconButton onClick={(e) => changeLanguage(e)}
                        size={"12vw"} 
                        icon={LanguageIcon[language]}/>
                    </motion.div>
                </motion.div>
                
                <AnimatePresence>
                    {order && (
                        <CardOrder order={true} item={listItems} onChange={handleCard}/>  )}
                </AnimatePresence>
                <Tab isVisible={visibleTab} onChange={handleChange}/>
                <motion.div className={classes.menu_layout}>
                    {products.length > 0 && (
                        <>
                        <CardMenu onChange={handleChange} items={BreakfastEntree} open={false} language={language} level="4" category={props.title} title={TitleMenuCategory[language].entree}/>
                        <CardMenu onChange={handleChange} items={BreakfastMain} open={false} language={language} level="3" category={props.title} title={TitleMenuCategory[language].main}/>
                        <CardMenu onChange={handleChange} items={BreakfastDessert} open={false} language={language} level="2" category={props.title} title={TitleMenuCategory[language].dessert}/>
                        <CardMenu onChange={handleChange} items={BreakfastDrinks} open={false} language={language} level="1" category={props.title} title={TitleMenuCategory[language].drinks}/>
                        </>
                    )}
                </motion.div>
                <Tab isVisible={isDesktop ? true : visibleTab} static={loaded ? true : false} onChange={handleChange}/>   

            </div>
            <AnimatePresence>
                    {card && <CardFeatures order={true} item={item} onChange={handleCard}/>}

                </AnimatePresence>
        </Div100vh>
    )
}

export default Order
