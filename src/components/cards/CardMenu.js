import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@material-ui/core';
import { motion } from "framer-motion";

import CartIcon from '@icons/cart_white_icon.png';
import ExpandedIcon from '@icons/expanded_white_icon.png';
import ReducedIcon from '@icons/reduced_white_icon.png';

import IconButton from '@components/buttons/_IconButton';
import MenuIconButton from '@components/buttons/MenuIconButton';
import CartButton from '@components/buttons/CartButton';
import CardProduct from '@components/cards/CardProduct.js';


const styles = makeStyles(theme => ({
    root:{
        position: ({open}) => open ? "absolute" : "relative",
        width:  ({open}) => open ? "100%" : "null",
        backgroundColor: theme.colors.primary.rich_black,
        [theme.breakpoints.up('lg')]: {
            width:  ({open}) => open ? "80%" : "null",
        },
    },
    header:  ({            
        position: ({open}) => open ? "fixed" : "relative",
        display: "flex",
        top: 0,
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderTopLeftRadius: ({open}) => open ? "0px" : "20px",
        borderTopRightRadius: ({open}) => open ? "0px" : "20px",
        boxShadow: "0 0 5px 5px black",
        backgroundColor: theme.colors.primary.rich_black,
        [theme.breakpoints.down('lg')]: {
            height: "14vw",
        },
        [theme.breakpoints.down('sm')]: {
            height: "16vw",  
        },
        [theme.breakpoints.up('lg')]: {
            height: "7vh", 
            width: "80vw",
        },
    }),
    text_header:{
        position: "relative",
        textAlign: "center",
        color: theme.colors.secondary.cultured, 
        fontFamily: "WorkSans",
        fontWeight: "bold",
        [theme.breakpoints.down('lg')]: {
            fontSize: "5vw",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "5.5vw",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "4vh",   
        },
    },
    expanded_button:{
        position: "absolute",
        top: ({open}) => open ? "3vw" : null,
        right: "3vw",
        [theme.breakpoints.up('lg')]: {
            right: "3vh",
            top: ({open}) => open ? "1.2vh" : null,
        },
    },
    back_button:{
        position: "absolute",
        top: "3vw",
        left: "3vw",
    },
    cart_button:{
        position: "absolute",
        top: "3vw",
        right: "15vw",
        [theme.breakpoints.up('lg')]: {
            top: ".35vh",
            right: "12vh",
        },
    },
    container: {
        position: ({open}) => open ? "relative" :  "absolute",
        display: "flex",
        marginTop: ({open}) => open ? "18vw" : "4vw",
        width: "100vw",
        paddingBottom: ({padding}) => padding,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: "center",
        [theme.breakpoints.down('lg')]: {
            gap: "5vh",
        },
        [theme.breakpoints.down('sm')]: {
            gap: "3vh",
        },
        [theme.breakpoints.up('lg')]: {
            gap: "9vh",
            width: "80vw",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: ({open}) => open ? "15vh" : "4vh",
        },
    },
    background: {
        position: "fixed",
        top: ({open}) => open ? 0 :  "",
        marginTop: ({open}) => open ? "15vw" : "4vw",
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.colors.primary.rich_black,
    },
}));

function CardMenu(props) {

    const classes = styles({open: props.open, padding: props.padding});

    const prevScrollY = useRef(0);

    const [goingUp, setGoingUp] = useState(false);
    const [listenerValue, setListenerValue] = useState(null);
    var products = JSON.parse(sessionStorage.getItem('Products'));

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (prevScrollY.current < currentScrollY && goingUp) {
            setGoingUp(false);
        }
        if (prevScrollY.current > currentScrollY && !goingUp) {
            setGoingUp(true);
        }

        prevScrollY.current = currentScrollY;
        if(listenerValue !== null && currentScrollY === 0) props.onChange(listenerValue);

        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);
    
    function handleChange(event, value) {
        event.persist();
        window.scrollTo(0, 0);
        if(window.scrollY === 0) props.onChange(value);
        else setListenerValue(value);
    }

    return (
        <motion.div layoutId={props.level} transition={{duration: .8}} className={classes.root}>
            <motion.div layoutId={"background " + props.level} transition={{duration: .8}} className={classes.background}/>
            <motion.div layoutId={"container " + props.level} transition={{duration: .8}} className={classes.container}>
                {props.items.length > 0 && (props.items.map((i, id) => {
                    return <CardProduct onChange={(value) => props.onChange(value)} key={id} title={i.title} 
                        price={i.price} description={i.description} thumb={i.thumb} language={props.language}
                        image={i.image} id={id} category={props.category} section={props.title} level={props.level}/>
                }))}
            </motion.div>
            <motion.div layoutId={"header " + props.level} transition={{duration: .8}}  onClick={(e) =>  { !props.open ? handleChange(e, "open " + props.level) : ""}}  className={classes.header}>
                <motion.span layoutId={"title " + props.level} key={props.title} transition={{duration: .8}} 
                className={classes.text_header}>{props.title}</motion.span>
                {props.open === true && 
                    (<div>
                        <motion.div layoutId={"expanded_button " + props.level} transition={{delay:.4, duration: .4}} 
                            className={classes.expanded_button}>
                            <MenuIconButton onClick={(e) => handleChange(e, "closed")} icon={ReducedIcon}/>                                
                        </motion.div>
                        <motion.div   transition={{delay:.4, duration: .4}}  initial={{opacity: 0}} exit={{opacity: 0}}
                        animate={{opacity: 1}} className={classes.cart_button}>
                            <CartButton items={products.length} icon={CartIcon} onClick={(e) => handleChange(e, "order")}/>
                        </motion.div> 
                    </div>)
                }
                {props.open === false && 
                    (<motion.div layoutId={"expanded_button " + props.level} transition={{duration: .4}}
                    className={classes.expanded_button}>
                        <MenuIconButton onClick={(e) => handleChange(e, "open " + props.level)} icon={ExpandedIcon}/>
                    </motion.div>)
                }
            </motion.div>
            
        </motion.div>
    )
}

export default CardMenu

