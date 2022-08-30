import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
    Divider,
    Button,
    FormGroup,
    FormHelperText,
    FormControl,
    FormControlLabel
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Add_Data, Delete_Data, Edit_Data } from "../Actions/action";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import "./TasklistPage.css";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function TaskListView() {
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [getTitle, setTitle] = React.useState("");
    const [timeValue, settimeValue] = React.useState("");
    const [getTitleEdit, setTitleEdit] = React.useState("");
    const [timeValueEdit, settimeValueEdit] = React.useState("");
    const [getIdValue, setIdValue] = React.useState("");

    const dispatch = useDispatch();
    let list = useSelector((state) => state.toDoReducer.toDoList);


    const handleSubmit = () => {
        let body = {
            title: getTitle,
            time: timeValue,
        };
        dispatch(Add_Data(body));
        setTitle("");
        settimeValue("");
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handle_Edit = (item, index) => {
        setOpenEdit(true);
        setTitleEdit();
        setIdValue(item.id);
        setTitleEdit(item.data.title);
        settimeValueEdit(item.data.time.$d);
    };

    const handleupdate = () => {
        var body = {
            title: getTitleEdit,
            time: timeValueEdit,
        };

        dispatch(Edit_Data({ id: getIdValue, body }));
        setOpenEdit(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className="bgColor" maxWidth="xl">
                <Box
                    sx={{
                        height: "100vh",
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Card sx={{ width: 650 }}>
                        <h4>To Do List</h4>
                        <Divider />

                        <div className="headerContent">
                            <div className="left-half ">
                                <h4>
                                    {" "}
                                    <span style={{ color: "#5B5FE8" }}>Thursday, 10th </span>{" "}
                                    <br /> December
                                </h4>
                            </div>
                            <div className="right-half ">
                                <p>{list.length} Tasks</p>
                            </div>
                        </div>
                        <Divider />

                        <div className="addBtn ">
                            <Fab color="warning" size="small" aria-label="add">
                                <AddIcon className=" " onClick={handleClickOpen} />
                            </Fab>
                        </div>

                        {list.map((item, index) => {
                            return (
                                <>
                                    {" "}
                                    <div className="actionSection" key={item.index}>
                                        <div className="checkboxLabel">
                                            <div>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox color="warning" />
                                                        }
                                                        label={item.data.title}
                                                    />
                                                </FormGroup>
                                                <FormHelperText className="helperText">
                                                    {new Date(item.data.time.$d).toLocaleTimeString()}
                                                </FormHelperText>
                                            </div>
                                        </div>
                                        <div className="actionBtnCall">
                                            <IconButton
                                                color="warning"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() => dispatch(Delete_Data(item.id))}
                                            >
                                                <DeleteIcon />
                                            </IconButton>{" "}
                                            &nbsp;&nbsp;
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() => handle_Edit(item, index)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider />
                                </>
                            );
                        })}

                        <Divider />
                    </Card>

                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                        >
                            Add To Do
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                                <Typography gutterBottom>Add Title</Typography>

                                <TextField
                                    id="outlined-required"
                                    label="Title"
                                    value={getTitle}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Select time"
                                        value={timeValue}
                                        onChange={(newValue) => {
                                            settimeValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <br />

                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </Button>
                            </FormControl>
                        </DialogContent>
                    </BootstrapDialog>

                    {/* ------------Edit----------------- */}
                    <BootstrapDialog
                        onClose={handleCloseEdit}
                        aria-labelledby="customized-dialog-title"
                        open={openEdit}
                    >
                        <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleCloseEdit}
                        >
                            Edit To Do
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                                <Typography gutterBottom>Add Title</Typography>

                                <TextField
                                    id="outlined-required"
                                    label="Title"
                                    value={getTitleEdit}
                                    onChange={(e) => setTitleEdit(e.target.value)}
                                />
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Select time"
                                        value={timeValueEdit}
                                        onChange={(newValue) => {
                                            console.log("ss", JSON.stringify(newValue));
                                            settimeValueEdit(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <br />

                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleupdate()}
                                >
                                    Update
                                </Button>
                            </FormControl>
                        </DialogContent>
                    </BootstrapDialog>
                </Box>
            </Container>
        </React.Fragment>
    );
}
