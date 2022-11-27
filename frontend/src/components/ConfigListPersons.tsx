import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { ConfigDto } from '../interfaces/ConfigDto';

interface ConfigProps {
    peopleList: ConfigDto[];
}
export const ConfigListPeople = (props: ConfigProps) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {props.peopleList.map((p) =>
                <ListItem
                    key={p.id + p.userId}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ContactMailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={p.name} />
                </ListItem>
            )}
        </List>
    )
}