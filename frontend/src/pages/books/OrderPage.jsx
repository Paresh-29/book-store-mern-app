import { useAuth } from "../../context/AuthContext";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";

const OrderPage = () => {
    const { currentUser } = useAuth();

    const { 
        data: orders = [], 
        isLoading, 
        isError, 
        error 
    } = useGetOrdersByEmailQuery(currentUser?.email, {
        skip: !currentUser?.email,
        refetchOnMountOrArgChange: true
    });
    console.log('currentUser: ',currentUser);
    console.log('Query error: ',error);
    console.log('Is loading: ', isLoading);
    console.log('Is error: ', error);
    console.log('Orders Data: ', orders);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">
                        {error?.data?.message || 'Failed to fetch orders. Please try again later.'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No orders found!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order, index) => (
                        <div 
                            key={order._id} 
                            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                    Order #{index + 1}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    ID: {order._id}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Customer Details</h3>
                                    <p className="text-gray-600">Name: {order.name}</p>
                                    <p className="text-gray-600">Email: {order.email}</p>
                                    <p className="text-gray-600">Phone: {order.phone}</p>
                                    <p className="text-gray-600 font-semibold">
                                        Total Price: ${order.totalPrice}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                                    <p className="text-gray-600">
                                        {order.address.city}, {order.address.state}<br />
                                        {order.address.country}, {order.address.zipcode}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold text-lg mb-2">Products</h3>
                                <div className="bg-gray-50 p-3 rounded">
                                    {order.productIds.map((productId) => (
                                        <div 
                                            key={productId}
                                            className="text-sm text-gray-600 mb-1"
                                        >
                                            {productId}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;