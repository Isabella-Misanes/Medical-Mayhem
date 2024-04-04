import { Box, Button, Divider, Grid, Modal } from '@mui/material';
import { buttonStyle } from '../App';
import { useContext } from 'react';
import GlobalStoreContext from '../store';

export default function ReportModal({open, onClose}) {
    const { store } = useContext(GlobalStoreContext);

    function handleSubmitReport(event) {
        store.submitReport(event);
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{
                width: '30%',
                height: '40%',
                bgcolor: '#4D9147',
                top: '20%',
                left: '30%',
                position: 'absolute',
                boxShadow: 10,
                textAlign: 'center',
                borderRadius: '16px',
                color: 'white'
            }}>
                <h1>Report McKillaGorilla</h1>
                <Divider />
                <Box sx={{
                    bgcolor: '#e3e3e3',
                    width: '100%',
                    height: '60%',
                    alignContent: 'center',
                    textAlign: 'center',
                    color: 'black'
                }}>
                    <p><strong>McKillaGorilla</strong> has invited you to their party.</p>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Button sx={[buttonStyle, {color: 'white'}]}
                                onClick={onClose()}>
                                X
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={[buttonStyle, {color: 'white'}]}
                                onClick={(event) => {handleSubmitReport(event)}}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
}