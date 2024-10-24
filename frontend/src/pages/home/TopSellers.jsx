// import React, { useEffect, useState } from 'react'
// import BookCard from '../books/BookCard';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

// const TopSellers = () => {
    
//     const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

//    const {data: books = []} = useFetchAllBooksQuery();
  
//     const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

//     return (
//         <div className='py-10'>
//             <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
//             {/* category filtering */}
//             <div className='mb-8 flex items-center'>
//                 <select
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
//                     {
//                         categories.map((category, index) => (
//                             <option key={index} value={category}>{category}</option>
//                         ))
//                     }
//                 </select>
//             </div>

//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 navigation={true}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 1,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 2,
//                         spaceBetween: 40,
//                     },
//                     1024: {
//                         slidesPerView: 2,
//                         spaceBetween: 50,
//                     },
//                     1180: {
//                         slidesPerView: 3,
//                         spaceBetween: 50,
//                     }
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//             >

//                 {
//                    filteredBooks.length > 0 && filteredBooks.map((book, index) => (
//                         <SwiperSlide key={index}>
//                             <BookCard  book={book} />
//                         </SwiperSlide>
//                     ))
//                 }



//             </Swiper>


//         </div>
//     )
// }

// export default TopSellers


// TopSellers.jsx
import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const { data, isLoading, error } = useFetchAllBooksQuery();

    // Extract books array from the response
    const books = data?.books || [];
    
    // Debug log to verify books array
    console.log('Books array:', books);

    const filteredBooks = selectedCategory === "Choose a genre" 
        ? books 
        : books.filter(book => book.category === selectedCategory.toLowerCase());

    if (isLoading) {
        return <div className="py-10">Loading books...</div>;
    }

    if (error) {
        return <div className="py-10 text-red-500">Error loading books: {error.message}</div>;
    }

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    name="category"
                    id="category"
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {filteredBooks.length === 0 && (
                <div className="text-center py-4">
                    No books found {selectedCategory !== "Choose a genre" && `in ${selectedCategory} category`}.
                </div>
            )}

            {filteredBooks.length > 0 && (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1180: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        }
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {filteredBooks.map((book, index) => (
                        <SwiperSlide key={book._id || index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default TopSellers;