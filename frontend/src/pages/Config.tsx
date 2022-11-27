import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { GetUserDto } from '../util/util';
import { useEffect, useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { Button } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { ConfigListPeople } from '../components/ConfigListPersons';
import { ConfigDto } from '../interfaces/ConfigDto';
import ConfigDialog from '../components/dialog/ConfigDialog';
import { GetFromServer, PostFromServer } from '../services/server';

export const Config = () => {
  const [peopleList, setPeopleList] = useState<ConfigDto[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const onServerResponse = (json: any) => {
    let configUsers: ConfigDto[] = json;
    setPeopleList(configUsers);
  }
  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'configuration'
    });
  }, [refresh]);

  const handleClose = (value: string) => {
    setOpen(false);
    if (value === "") return;
    let user = GetUserDto();
    if (user == null) return;

    // Create new user:
    PostFromServer({
      callbackFunction: (str: string) => { setRefresh(true); },
      endpoint: 'configuration',
      data: {
        "name": value,
        "userId": user.id
      }
    });
  };

  return (
    <>
      <TopNavBar pageName={'Configuration'} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" color="error"
            onClick={() => setOpen(true)}
            endIcon={<AccessibilityNewIcon />}>Add Person</Button>
        </Box>
      </Container>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ConfigListPeople peopleList={peopleList} />
      </Box>

      <ConfigDialog
        open={open}
        onClose={handleClose}
      />

    </>
  )
}
export default Config;