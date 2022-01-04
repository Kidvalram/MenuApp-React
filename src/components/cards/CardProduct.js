import React, { Suspense, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const styles = makeStyles(theme => ({
    root:   {
        position: "relative",
        display: "flex",
        width: "90%",
        height: "12vh",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        [theme.breakpoints.up('lg')]: {
            width: "42.5%",
        },
        '& $info': {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: "center",
            width: "60%",
            height: "100%",
            gap: ".5vh",
            '& $title': { 
                color: theme.colors.secondary.cultured, 
                fontFamily: "WorkSans",
                fontWeight: "bold",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "3.6vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "3.8vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "3vh",

                },
            },
            '& $price': {
                color: theme.colors.secondary.golden_brown, 
                fontFamily: "Lora",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "3.2vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "3.5vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "2.8vh",
                },
            },
            '& $description': {
                color: theme.colors.secondary.cultured, 
                fontFamily: "Ruluko",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "3vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "3.6vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "2.6vh",
                },
            },
        },
        '& $image': {
            position: "relative",
            height: "80%",
            width: "35%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            [theme.breakpoints.down('lg')]: {
                height: "100%",
                width: "32%",            },
            [theme.breakpoints.down('sm')]: {
                height: "90%",
                width: "35%",            },
            [theme.breakpoints.up('lg')]: {
                height: "100%",
            },
            "& $img": {
                borderRadius: "20px" ,
                objectFit: "cover", 
                height: "100%", 
                width: "100%"
            },
            "& $background_image": {
                height: "100%", 
                width: "100%", 
                position: "absolute", 
                background: 
                "#9E692F", 
                borderRadius: "20px", 
                opacity: .7
            },
            "& $quantity": {
                fontFamily: "WorkSans",
                fontWeight: "bold", 
                color: theme.colors.secondary.cultured, 
                position: "absolute",
                [theme.breakpoints.down('lg')]: {
                    fontSize: "9vw",
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: "10vw",
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: "6.5vh",
                },
            }
        }
    },
    info: {},
    title: {},
    price: {},
    description: {},
    image: {},
    img: {},
    background_image: {},
    quantity: {}
}));

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function CardProduct(props) {

    const classes = styles();
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const truncate = (input) => input.length > 50 ? `${input.substring(0, 50)}...` : input;

    const titleId = props.title.en + " " + props.id + " " + props.level;
    const priceId = props.title.en + " PRICE " + props.id + " " + props.level;
    const descriptionId = props.title.en + " DESCRIPTION " + props.id + " " + props.level;
    const imageId = props.title.en + " IMAGEN " + props.id + " " + props.level;

    const product = [
        {
            titleId: titleId,
            priceId: priceId,
            descriptionId: descriptionId,
            imageId: imageId,
            title: props.title,
            price: props.price,
            image: props.image,
            thumb: props.thumb,
            description: props.description,
            section: props.section,
            category: props.category,
        }
    ];

    return (
        <motion.div className={classes.root} onClick={() => { props.onChange(product)}}>
            <div className={classes.info}>
                <motion.div layoutId={titleId} className={classes.title}>
                    {props.language === 0 && product[0].title.en}
                    {props.language === 1 && product[0].title.es}
                    {props.language === 2 && product[0].title.fr}
                </motion.div>
                <motion.div layoutId={priceId} className={classes.price}>
                    {product[0].price}
                </motion.div>
                <motion.div layoutId={descriptionId} className={classes.description}>
                    {props.language === 0 && truncate(product[0].description.en)}
                    {props.language === 1 && truncate(product[0].description.es)}
                    {props.language === 2 && truncate(product[0].description.fr)}
                </motion.div>
            </div>
            <div className={classes.image}>
                <motion.img className={classes.img}  
                    src={product[0].thumb} alt="Le Petite Gastronimique"/>   
                {props.quantity > 1 && (
                    <>
                    <div className={classes.background_image}/>
                    <span className={classes.quantity}>x{props.quantity}</span>
                    </>
                )}     
            </div>
        </motion.div>
    )
}

export default CardProduct
