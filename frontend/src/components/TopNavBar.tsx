import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import { createTheme } from '@mui/material/styles';

interface AppBarProps {
    pageName: string;
}
export const TopNavBar = (props: AppBarProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.pageName}
                    </Typography>
                    <Button color="inherit">
                        <LogoutIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}