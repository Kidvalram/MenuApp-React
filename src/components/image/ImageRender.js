import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntersection } from './intersectionObserver';
import { motion, AnimatePresence } from "framer-motion";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";

const styles = makeStyles(theme => ({
  root:{
    position: "absolute",
    width: "100%",
    height: "100%",
    // opacity: 0,
    '& $thumb_container':{
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      "& $thumb": {
        position: "absolute",
        opacity: 1,
        width: "100%",
        height: "100%",
        borderRadius: "20px", 
        objectFit: "cover",
        filter: "blur(5px)",
        transition: "opacity 1s ease-out",
      },
      '& $img': {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "20px", 
        objectFit: "cover",
      },
    }, 
  },
  img: {},
  thumb_container:{},
  thumb: {
    '& $isLoaded': {
      // opacity: 0
    }
  },
  isLoaded:{
    transition: "opacity 1s ease-out",
    // opacity: 1,
  }
}));

const animations = {
  opacity_image_on: {
    opacity: 1,
  },
  opacity_image_off: {
    opacity: 0,
  },
};

const transition = {
  duration: .8,
}

const ImageRenderer = ({ url, thumb }) => {

  const classes = styles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [image, setImage] = useState(thumb);
  const imgRef = useRef();

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div className={classes.root} ref={imgRef}>
      {isInView && (
        <>
          <div className={classes.thumb_container}>
            <motion.img className={classes.img} src={url} onLoad={handleOnLoad}/>
          </div>
          <motion.div initial={{opacity : isLoaded ? 1 : 0}} 
          animate={{opacity : isLoaded ? 0 : 1}} className={classes.thumb_container}>
            <motion.img className={classes.thumb} src={thumb}/>
            <ClockLoader color={"#F7F6F6"} loading={true} size={50}/>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
