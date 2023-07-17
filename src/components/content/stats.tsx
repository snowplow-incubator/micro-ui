import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEventTotals } from '@/hooks';
import { Grid } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography variant="h5" component="div">
                Total Events
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

export function StatsCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Grid container>
                <Card variant="outlined"><TotalEventsStat /></Card>
                <Card variant="outlined"><GoodEventsStat /></Card>
                <Card variant="outlined"><BadEventsStat /></Card>
            </Grid>
        </Box>
    );
}

export function GoodEventsStat() {
    const { eventTotals } = useEventTotals();

    return (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Good Events
                </Typography>
                <Typography variant="h5" component="div">
                    {eventTotals?.good}
                </Typography>
            </CardContent>
            <Typography color="text.secondary">
                Number of Good Events recorded
            </Typography>
        </React.Fragment>
    );
}

export function BadEventsStat() {
    const { eventTotals } = useEventTotals();

    return (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Bad Events
                </Typography>
                <Typography variant="h5" component="div">
                    {eventTotals?.bad}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Number of Bad Events recorded</Button>
            </CardActions>
        </React.Fragment>
    );
}

export function TotalEventsStat() {
    const { eventTotals } = useEventTotals();

    return (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Total Events
                </Typography>
                <Typography variant="h5" component="div">
                    {eventTotals?.total}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Total Number of Events recorded</Button>
            </CardActions>
        </React.Fragment>
    );
}