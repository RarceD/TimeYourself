import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';

interface ConfigDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

const ConfigDeleteDialog = (props: ConfigDialogProps) => {
    const { onClose, open } = props;

    useEffect(() => {
    }, []);

    const handleClose = () => {
        onClose("");
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>You want to delete this person?</DialogTitle>
            <Typography
                alignContent="center"
                alignItems="center"
                justifyContent="center"
            >
                This action can not be undo.
            </Typography>
            <Grid container direction="row" justifyContent="center" alignItems="center" marginBottom="40px"
                marginTop="20px"
                spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => onClose("")}
                        color="error"
                        size="large"
                    >
                        Exit
                    </Button>

                </Grid>
                <Grid item >
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        size="large"
                    >
                      Delete user 
                    </Button>
                </Grid>
            </Grid>

        </Dialog>
    );
}
export default ConfigDeleteDialog;