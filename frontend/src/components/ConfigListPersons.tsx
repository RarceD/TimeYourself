import { Avatar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { ConfigDto } from '../interfaces/ConfigDto';
import { useState } from 'react';
import ConfigDeleteDialog from './dialog/ConfigDeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { PostFromServer } from '../services/server';

interface ConfigProps {
    peopleList: ConfigDto[];
    refreshFunction: () => void
}
export const ConfigListPeople = (props: ConfigProps) => {
    const { peopleList } = props;
    const [showDetails, setShowDetails] = useState(false);
    const [userToDelete, setUserToDelete] = useState(-1);

    const onItemClick = (id: number) => {
        console.log("detete", id)
        setShowDetails(true);
        setUserToDelete(id);
    }
    const onItemClose = () => {
        console.log("close")
        setShowDetails(false);
        PostFromServer({
            callbackFunction: (str: string) => { console.log(str); props.refreshFunction()},
            endpoint: 'configuration/remove',
            data: {
                "userId": userToDelete,
                "id": userToDelete,
                "name": ""
            }
        });
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} dense={false}>
                {peopleList.map((p: any) =>
                    <ListItem
                        key={p.id + p.userId}
                        onClick={() => onItemClick(p.id)}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete"
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar color="success">
                            <Avatar >
                                <ContactMailIcon color="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={p.name} className='ConfigList_Names' />
                    </ListItem>

                )}
            </List>
            <ConfigDeleteDialog
                open={showDetails}
                onClose={onItemClose}
            />
        </>

    )
}