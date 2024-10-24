import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ['Orders']
        }),
        getOrdersByEmail: builder.query({
            query: (email) => ({
                // Update URL to match your backend route
                url: `/email/${email}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response?.orders || [];
            },
            providesTags: ['Orders']
        }),
    }),
});

export const { 
    useCreateOrderMutation,
    useGetOrdersByEmailQuery 
} = ordersApi;

export default ordersApi;