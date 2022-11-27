import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material';

export interface ConfigDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

const ConfigDialog = (props: ConfigDialogProps) => {
    const { onClose, open } = props;
    const [user, setUser] = useState("");
    const [errorTextField, serErrorTextField] = useState(false);

    useEffect(() => {
        console.log("create")
        serErrorTextField(false);
    }, []);

    const handleClose = () => {
        if (user !== "") 
            onClose(user);
        serErrorTextField(true);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add new person to track:</DialogTitle>
            <Typography alignContent={"center"}>
                You can add more people for monitor your meetings with:
            </Typography>
            <TextField
                margin="normal"
                fullWidth
                label="Type new user:"
                name="email"
                error={errorTextField}
                autoFocus
                onChange={(e: any) => { setUser(e.target.value); }}
            />
            <Grid container direction="row" justifyContent="center" alignItems="center" marginBottom="10px" spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => onClose("")}
                        color="error"
                    >
                        Exit
                    </Button>

                </Grid>
                <Grid item >
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>

        </Dialog>
    );
}
export default ConfigDialog;