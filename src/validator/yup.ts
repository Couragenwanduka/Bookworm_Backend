import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const genreSchema = yup.object().shape({
    genre: yup.string().required('genre is required')
});

export const categorySchema = yup.object().shape({
    name: yup.string().required('category name required'),
    user: yup.string().required('user required')
});

export const idSchema = yup.object().shape({
    id: yup.string().required('id is required')
});

export const urlSchema = yup.object().shape({
    url: yup.string().required('url is required')
});

export const bookSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    author: yup.string().required('author is required'),
    category: yup.string().required('category is required'),
    user: yup.string().required('category is required'),
});

export const updateBookSchema = yup.object().shape({
    id: yup.array().required("book id's are required"),
    newCategory: yup.string().required('category is required'),
});

export const noteSchema = yup.object().shape({
    id: yup.string().required("note id's are required"),
    name: yup.string().required("note name's are required"),
})

export const contentSchema = yup.object().shape({
    id: yup.string().required("note id's are required"),
    name: yup.string().required("note name's are required"),
    content: yup.string().required("content is required"),
})