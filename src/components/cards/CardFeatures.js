import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";
import { useGlobalState } from 'state-pool';
import useMediaQuery from '@mui/material/useMediaQuery';

import {CardFeaturesText as CardFeaturesText} from '@shared/GlobalData.js';

import CardIconButton from '@components/buttons/CardIconButton';
import PlusIcon from '@icons/plus_white_icon.png';
import LessIcon from '@icons/less_white_icon.png';
import DarkIconButton from '@components/buttons/DarkIconButton';
import ClosedIcon from '@icons/closed_white_icon.png';
import IconButton from '@components/buttons/_IconButton';
import CategoryButton from '@components/buttons/CategoryButton';
import ImageRenderer from '../image/ImageRender';
import theme from "@components/AppTheme";

const styles = makeStyles(theme => ({
    root:{
        position: "absolute",
        height: "100%",
        width: "100%", 
        top: 0,
        [theme.breakpoints.up('lg')]: {
            right: 0,
            width: "75%", 
        },
        '& $shadow_background': {
            position: "fixed",
            height: "100%",
            width: "100%", 
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(2px)",
            [theme.breakpoints.up('lg')]: {
                width: "75%",
            },
        },
        '& $container': {
            position: "fixed",
            height: "100%",
            width: "100%",
            [theme.breakpoints.up('lg')]: {
                width: "75%",
            },
            '& $card':{
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
                alignContent: "center",
                borderRadius: "20px",
                boxShadow: ".1px 15px 15px #000000",        
                background: theme.colors.primary.rich_black,
                [theme.breakpoints.down('lg')]: {
                    height: "90%",
                    width: "75%",
                },
                [theme.breakpoints.down('sm')]: {
                    height: "90%",
                    width: "90%",
                },
                [theme.breakpoints.up('lg')]: {
                    height: "90%",
                    width: "45%",
                },
                '& $closed_button':{
                    position: "absolute",
                    top: "3vw",
                    right: "3vw",
                    [theme.breakpoints.up('lg')]: {
                        top: "3vh",
                        right: "3vh"
                    },
                },
                '& $image': {
                    position: "relative",
                    height: "30%",
                    width: "100%"
                },
                '& $title': {
                    position: "absolute",
                    height: "45%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    color: theme.colors.secondary.smoky_black, 
                    fontFamily: "WorkSans",
                    boxShadow: " 0px 0px 8px 4px #000000",
                    fontWeight: "bold",
                    textAlign: "center",
                    bottom: "-30%",
                    borderRadius: "20px",
                    backdropFilter: "blur(7px)",
                    backgroundColor: theme.colors.button.light_background,
                    [theme.breakpoints.down('lg')]: {
                        fontSize: "4.5vw",
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "4.8vw",
                    },
                    [theme.breakpoints.up('lg')]: {
                        fontSize: "3.1vh",
                    },
                },
                '& $info_section': {
                    position: "relative",
                    height: "58%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    '& $subtitle': {
                        position: "relative",
                        color: theme.colors.secondary.golden_brown, 
                        fontFamily: "Lora",
                        fontWeight: "Bold",
                        [theme.breakpoints.down('lg')]: {
                            fontSize: "4.3vw",
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "4.5vw",
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: "2.8vh",
                        },
                    },
                    '& $description': {
                        position: "relative",
                        color: theme.colors.secondary.cultured, 
                        marginRight: "3vw",
                        marginLeft: "3vw",
                        fontFamily: "Ruluko",
                        fontWeight: "bold",
                        textAlign: "center",
                        [theme.breakpoints.down('lg')]: {
                            fontSize: "3.5vw",
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "4vw",
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: "2.5vh",
                        },
                    },
                    '& $delete_button': {
                        position: "relative",
                        color: "#D95130", 
                        marginRight: "3vw",
                        marginLeft: "3vw",
                        fontFamily: "Ruluko",
                        fontWeight: "bold",
                        textAlign: "center",
                        [theme.breakpoints.down('lg')]: {
                            fontSize: "4.2vw",
                        },
                        [theme.breakpoints.down('sm')]: {
                            fontSize: "4.5vw",
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: "2.4vh",
                        },
                        
                    },
                    '& $counter': {
                        position: "relative",
                        color: theme.colors.secondary.cultured, 
                        marginRight: "3vw",
                        marginLeft: "3vw",
                        fontFamily: "Baskerville",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-around",
                        alignContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        [theme.breakpoints.down('lg')]: {
                            width: "35vw",
                        },
                        [theme.breakpoints.down('sm')]: {
                            width: "40vw",
                        },
                        [theme.breakpoints.up('lg')]: {
                            width: "25vh",
                        },
                        '& $text_counter': {
                            position: "absolute",
                            [theme.breakpoints.down('lg')]: {
                                fontSize: "9.5vw",
                            },
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "10vw",
                                paddingTop: ".5vh",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: "6vh",
                                paddingTop: "1vh",                            
                            },
                        },
                    },
                    '& $add_button': {
                        width: "90%",
                        paddingBottom: "2vh"
                    },
                },
            },
        },
    },
    card: {},
    delete_button: {},
    container: {},
    closed_button: {},
    shadow_background: {},
    info_section: {},
    title: {},
    subtitle: {},
    description: {},
    counter: {},
    text_counter: {},
    add_button: {},
    image:{},
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

function CardFeatures(props) {

    const classes = styles({order: props.order});
    const [language, setLanguage] = useGlobalState("language");
    const [animation, setAnimation] = useGlobalState("addAnimation");
    const [counter, setCounter] = useState(0);
    const products = JSON.parse(sessionStorage.getItem('Products'));

    var lg = useMediaQuery(theme.breakpoints.up('lg'));
    var md = useMediaQuery(theme.breakpoints.down('lg'));
    var sm = useMediaQuery(theme.breakpoints.down('sm'));

    let price = "";
    let image = "";
    let thumb = "";
    let category = "";
    let section = "";
    let title = "";
    let description = "";

    useEffect(() => {
        setAnimation(false);
    }, [])
    
    switch (language) {
        case 0:
            title = props.item[0].title.en;
            description = props.item[0].description.en;
            break;
        case 1:
            title = props.item[0].title.es;
            description = props.item[0].description.es;
            break;
        case 2:
            title = props.item[0].title.fr;
            description = props.item[0].description.fr;
            break;
        default:
            break;
    }

    if(props.item[0].price) price = props.item[0].price;
    if(props.item[0].image) image = props.item[0].image;
    if(props.item[0].thumb) thumb = props.item[0].thumb;
    if(props.item[0].category) {
        category = props.item[0].category.toLowerCase();
        category = category.charAt(0).toUpperCase() + category.slice(1);
    }
    if(props.item[0].section){ 
        section = props.item[0].section.toLowerCase();
        section = section.charAt(0).toUpperCase() + section.slice(1);
    }

    const product = [
        {
            title: props.item[0].title,
            price: props.item[0].price,
            image: props.item[0].image,
            thumb: props.item[0].thumb,
            description: props.item[0].description,
            quantity: 1
        }
    ];

    function handleChange(event, value) {
        event.persist();
        props.onChange(value);
    }

    function handleAdd(event, value) {
        if(counter > 0){
            event.persist();
            if(!props.order) setAnimation(true);
            if(sessionStorage.getItem('Products') == null){
                var products = [];
                for(var i = 0; i < counter; i++) products.push(product[0]);
                sessionStorage.setItem('Products', JSON.stringify(products));
            }else{
                var products = JSON.parse(sessionStorage.getItem('Products'));
                for(var i = 0; i < counter; i++) products.push(product[0]);
                sessionStorage.setItem('Products', JSON.stringify(products));
            }

            props.onChange(value);
        }
    }

    

    function handleDelete(){
        const index = products.findIndex(p => p.title.en === product[0].title.en);
        products.splice(index,1);
        sessionStorage.setItem('Products', JSON.stringify(products));
        props.onChange("closed");
    }

    return (
        <div className={classes.root}>
            <motion.div initial="initial_background" variants={animations} 
            animate="animate_background" transition={backgroundTransition} 
            exit="initial_background" className={classes.shadow_background}/>
            <motion.div initial="right_animated_card" variants={animations} 
                animate="animated_component" transition={cardTransition} 
                exit="right_animated_card" className={classes.container}>
                <div className={classes.card}>
                    <div className={classes.image}>
                        <ImageRenderer  
                        url={image} thumb={thumb}/>     
                        <div className={classes.title}>
                            <span>{title}</span>
                        </div>       
                    </div>
                    <div className={classes.closed_button}>
                        <DarkIconButton icon={ClosedIcon} onClick={(e) => handleChange(e,"closed")}/>
                    </div>
                    <div className={classes.info_section}>
                    <div className={classes.subtitle}>
                            {!props.order && (<span>{category} {category && (<span>/ </span>)} 
                            {section} {section && (<span>- </span>)}{price}</span>)}
                        </div>
                        <div className={classes.description}>
                            <span>{description}</span>
                        </div>
                        <div className={classes.counter}>
                            <CardIconButton onClick={() => {if(counter > 0) setCounter(counter - 1)}} icon={LessIcon}/>
                            <motion.span className={classes.text_counter} key={counter} initial={{opacity: 0}} exit={{opacity: 0}}
                            animate={{opacity: 1}} transition={{duration: .8}}>
                                {counter}
                            </motion.span>
                            <CardIconButton onClick={() => setCounter(counter + 1)} icon={PlusIcon}/>
                        </div>
                        {props.order && (<motion.span className={classes.delete_button} onClick={() => handleDelete()}>
                            {CardFeaturesText[language].delete}
                        </motion.span>)}
                        <div className={classes.add_button}>
                            <CategoryButton text={props.order ? CardFeaturesText[language].update : CardFeaturesText[language].add} 
                            onClick={(e) => handleAdd(e,"closed")}/>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CardFeatures
