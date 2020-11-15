import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
//import CountryPicker from '../CountryPicker/CountryPicker';
import cx from 'classnames';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return "Loading..."
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> INFECTED  : </Typography>
                        <Typography varient="h5">
                            <CountUp start={0} end={confirmed.value} duration={2} separator="," />
                        </Typography>
                        <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()} </Typography>
                        <Typography varient="body2">NUMBER OF ACTIVE CASES : </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> RECOVERED  : </Typography>
                        <Typography varient="h5">
                            <CountUp start={0} end={recovered.value} duration={2} separator="," />
                        </Typography>
                        <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()} </Typography>
                        <Typography varient="body2">NUMBER OF RECOVERIES : </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> DEATHS  : </Typography>
                        <Typography varient="h5">
                        <CountUp start={0} end={deaths.value} duration={2} separator="," />
                        </Typography>
                        <Typography color="textSecondary">  {new Date(lastUpdate).toDateString()} </Typography>
                        <Typography varient="body2">NUMBER OF DEATHS  : </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;