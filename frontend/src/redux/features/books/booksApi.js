import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {  // Changed Headers to headers (case-sensitive)
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);  // Changed Headers to headers
        }
        return headers;  // Changed Headers to headers
    }
});

const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => `/`,
            providesTags: ["Books"],
            // Add error handling
            transformErrorResponse: (response, meta, arg) => response.data
        }),

        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Books', id }]
        }),

        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),

        updateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    "Content-type": "application/json"
                }
            }),
            invalidatesTags: ["Books"]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            }),
            invalidatesTags: ["Books"],
            // Add error handling
            transformErrorResponse: (response, meta, arg) => response.data
        }),
    })
});

export const { 
    useFetchAllBooksQuery, 
    useFetchBookByIdQuery, 
    useAddBookMutation, 
    useUpdateBookMutation, 
    useDeleteBookMutation 
} = booksApi;

export default booksApi;