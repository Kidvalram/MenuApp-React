import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        width: theme.button.width,
        fontFamily: theme.button.font_family,
        fontWeight: theme.button.font_weight,
        backgroundColor: theme.button.background_color,
        color: theme.colors.primary.alabaster,
        borderRadius: theme.button.border_radius,
        [theme.breakpoints.down('sm')]: {
            height: theme.button.category.height.values.sm,
            fontSize: theme.button.category.size_font.values.sm,
        },
        [theme.breakpoints.up('sm')]: {
            height: theme.button.category.height.values.md,
            fontSize: theme.button.category.size_font.values.md,
        },
        [theme.breakpoints.up('lg')]: {
            height: theme.button.category.height.values.lg,
            fontSize: theme.button.category.size_font.values.lg,
        },
    },
    label: {
        textTransform: "capitalize"
    }
}));

function CategoryButton({onClick, text}){

    const classes = styles();

    return (
        <Button onClick={onClick} className={classes.root}>
            {text}
        </Button>
    )
}

export default CategoryButton
