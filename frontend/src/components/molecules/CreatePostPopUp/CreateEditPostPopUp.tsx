import { Box, Button, Dialog, DialogTitle, SxProps, TextField } from '@mui/material'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as yup from "yup";
import React, { useState } from 'react'
import { ImagePostService } from '../../../Services/ImagePostService'
import { ImagePost } from '../../../types/models/ImagePost.model'
import { User } from '../../../types/models/User.model'
import { Nullable } from '../../../types/Nullable';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    imageURL: string
    description: string
}

const validationSchema = yup.object().shape({
    imageURL: yup.string().required("Please enter a link to your picture."),
    description: yup
        .string()
        .required("Please enter a description for your post.")
        .max(200, "Description can only be 200 characters long."),
});

type Props = {
    activeUser: Nullable<User>
    sx?: SxProps
}

const CreateEditPostPopUp = ({ activeUser, sx }: Props) => {

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
                Create new Post
            </Button>
            <Dialog
                open={openPopUp}
                onClose={handleClosePopUp}
            >
                <DialogTitle>Create new Post</DialogTitle>
                <Formik
                    initialValues={{
                        imageURL: "",
                        description: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values: FormValues,
                        formikHelpers: FormikHelpers<FormValues>
                    ) => {
                        const newImagePost: ImagePost =
                        {
                            id: "",
                            imageURL: values.imageURL,
                            description: values.description,
                            author: { email: "", lastName: "", firstName: "" },
                            publicationTime: new Date(),
                            likes: []
                        }
                        ImagePostService()
                            .createNewPost(newImagePost, activeUser ? activeUser.email : "")
                            .catch((error) => {
                                alert(`Error: couldn't create image posts: ${error.message}`)
                            })
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
                                        name="imageURL"
                                        label="ImageURL"
                                        placeholder='Enter URL of Image'
                                        onChange={formikProps.handleChange}
                                        value={formikProps.values.imageURL}
                                    />
                                    {formikProps.errors.imageURL && (
                                        <div>{formikProps.errors.imageURL}</div>
                                    )}
                                    <TextField
                                        name="description"
                                        label="Description"
                                        placeholder='Enter a description'
                                        onChange={formikProps.handleChange}
                                        multiline
                                        value={formikProps.values.description}
                                    />
                                    {formikProps.errors.description && (
                                        <div>{formikProps.errors.description}</div>
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

export default CreateEditPostPopUp