import { Box, Button, Dialog, DialogTitle, SxProps, TextField } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as yup from "yup";
import React, { useState } from 'react'
import { User } from '../../../types/models/User.model'
import { useNavigate } from 'react-router-dom';
import UserService from '../../../Services/UserService';

interface FormValues {
    email: string
    firstName: string
    lastName: string
}

const validationSchema = yup.object().shape({
    email: yup.string().required("Please enter a valid email."),
    firstName: yup
        .string()
        .required("Please enter your new first name.")
        .max(20, "First names can only be up to 20 characters long."),
    lastName: yup
        .string()
        .required("Please enter your new last name.")
        .max(20, "First names can only be up to 20 characters long."),
});

type Props = {
    user: User
    sx?: SxProps
}

const EditUserPopUp = ({ user, sx }: Props) => {

    const navigate = useNavigate()

    const [openPopUp, setOpenPopUp] = useState<boolean>(false)

    const handleOpenPopUp = () => {
        setOpenPopUp(true)
    }
    const handleClosePopUp = () => {
        setOpenPopUp(false)
    }

    return (
        <Box sx={{ ...sx }}>
            <Button
                onClick={handleOpenPopUp}
                variant="outlined"
                sx={{}}>
                Edit
            </Button>
            <Dialog
                open={openPopUp}
                onClose={handleClosePopUp}
            >
                <DialogTitle>Edit User</DialogTitle>
                <Formik
                    initialValues={{
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values: FormValues,
                        formikHelpers: FormikHelpers<FormValues>
                    ) => {
                        const newUser: User =
                        {
                            ...user,
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName
                        }
                        UserService.updateUser(newUser);
                        formikHelpers.setSubmitting(false);
                        handleClosePopUp()
                        navigate(0)
                    }}
                    validateOnChange
                >
                    {(formikProps: FormikProps<FormValues>) => (
                        <Form autoComplete='off' onSubmit={formikProps.handleSubmit}>
                            <Box sx={{ height: "100%", width: "100%" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        placeholder='Enter your Email'
                                        onChange={formikProps.handleChange}
                                        value={formikProps.values.email}
                                    />
                                    {formikProps.errors.email && (
                                        <div>{formikProps.errors.email}</div>
                                    )}
                                    <TextField
                                        name="firstName"
                                        label="First Name"
                                        placeholder='Enter a first name'
                                        onChange={formikProps.handleChange}
                                        multiline
                                        value={formikProps.values.firstName}
                                    />
                                    {formikProps.errors.firstName && (
                                        <div>{formikProps.errors.firstName}</div>
                                    )}
                                    <TextField
                                        name="lastName"
                                        label="Last Name"
                                        placeholder='Enter a last name'
                                        onChange={formikProps.handleChange}
                                        multiline
                                        value={formikProps.values.lastName}
                                    />
                                    {formikProps.errors.lastName && (
                                        <div>{formikProps.errors.lastName}</div>
                                    )}
                                </Box>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    disabled={formikProps.isSubmitting}
                                >
                                    Send
                                </Button>
                                <Button
                                    type="reset"
                                    disabled={formikProps.isSubmitting}
                                    onClick={() => {
                                        handleClosePopUp()
                                        formikProps.resetForm()
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </Box>
    )
}

export default EditUserPopUp