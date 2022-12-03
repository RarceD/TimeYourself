import { Avatar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { ConfigDto } from '../interfaces/ConfigDto';
import { useState } from 'react';
import ConfigDeleteDialog from './dialog/ConfigDeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfigProps {
    peopleList: ConfigDto[];
}
export const ConfigListPeople = (props: ConfigProps) => {
    const { peopleList } = props;
    const [showDetails, setShowDetails] = useState(false);

    const onItemClick = (id: number) => {
        console.log("detete")
        setShowDetails(true);
    }
    const onItemClose = () => {
        console.log("close")
        setShowDetails(false);
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} dense = {false}>
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
                        <ListItemText primary={p.name} className='ConfigList_Names'/>
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