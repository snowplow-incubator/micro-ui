
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Menu';

import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'

export function Navbar() {
    return (
        <Box sx={{ flexGrow: 1, p: 0 }}>
            <AppBar position='static'>
                <Toolbar >
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Snowplow Micro </Typography>
                </Toolbar>
            </AppBar>
        </Box >
    );
}