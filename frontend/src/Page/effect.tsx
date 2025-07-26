import { useState } from "react";
import { Alert, Typography, IconButton, Box } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseIcon from "@mui/icons-material/Close";

function Effect() {
    const [open, setOpen] = useState(true);

    if (!open) return null;

    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: "center",
                alignItems: "center",
                bgcolor: '#FFF9E5',
                paddingTop: '50px',
                height: '100px'
            }}
        >
            <Alert
                icon={<AutoAwesomeRoundedIcon sx={{ color: "#5356FB" }} />}
                severity="success"
                sx={{
                    background: "linear-gradient(92deg,#FAF4E4 70%, #FFCAA0 100%)",
                    boxShadow: "0 2px 24px 0 #FFE5B466",
                    color: "#264237",
                    borderRadius: 3.5,
                    px: 2.5,
                    alignItems: 'center'
                }}
                action={
                    <IconButton
                        aria-label="cut"
                        color="inherit"
                        size="small"
                        onClick={() => setOpen(false)}
                        sx={{ ml: 1 }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <Typography
                    fontSize={15}
                    sx={{
                        color: "#232B38",
                        fontWeight: 500,
                        letterSpacing: 0.7,
                        lineHeight: 1.5,
                        textShadow: "0px 1px 2px #FFE5B455"
                    }}
                    textAlign="center"
                >
                    Powering ideas, connecting innovators—your next big breakthrough starts here.
                </Typography>
            </Alert>
        </Box>
    );
}

export default Effect;
