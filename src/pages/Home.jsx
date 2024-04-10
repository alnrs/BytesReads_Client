import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { Helmet } from "react-helmet";
import { Button } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SwiperCore from "swiper";
import { TextInput } from 'flowbite-react';
import "swiper/css/bundle";
import { AiOutlineSearch } from 'react-icons/ai';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [books, setBooks] = useState([]);
  const [series, setSeries] = useState([]);
  const [kdramas, setKdramas] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [Schemabooks, setSchemaBooks] = useState([]);
  const [Schemaseries, setSchemaSeries] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch books and series
    const fetchBooksByCategory = async (category, setBooks) => {
      try {
        const res = await fetch(
          `/api/book/getbooks?category=${category}&limit=3`
        );
        const data = await res.json();
        setBooks(data.books);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch books and series when the component mounts
    fetchBooksByCategory("Schemabooks", setSchemaBooks);
    fetchBooksByCategory("Schemaseries", setSchemaSeries);
  }, []);

  useEffect(() => {
    const fetchBooksByCategory = async (category) => {
      try {
        const res = await fetch(
          `/api/book/getbooks?category=${category}&limit=12`
        );
        const data = await res.json();

        switch (category) {
          case "books":
            setBooks(data.books);
            break;
          case "series":
            setSeries(data.books);
            break;
          case "kdrama":
            setKdramas(data.books);
            break;
          case "anime":
            setAnimes(data.books);
            break;
          case "reviews":
            setReviews(data.books);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch books for each category
    fetchBooksByCategory("books");
    fetchBooksByCategory("series");
    fetchBooksByCategory("kdrama");
    fetchBooksByCategory("anime");
    fetchBooksByCategory("reviews");
  }, []);

  const pageTitle =
    "ByteReads - Your Ultimate Source for Books";
  const pageDescription =
    "Explore a variety of books.";
  const pageKeywords = "books, series";
  const canonicalUrl = "https://www.example.com/search";
  const ogImageUrl = "https://www.example.com/book-96.svg";
  const generateMediaSchemaArray = (books) => {
    return books.map((book) => {
      return {
        "@context": "http://schema.org",
        "@type": "Book",
        name: book.title,
        description: book.content,
        image: book.image,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          reviewCount: "100",
        },
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="bg-blue-100">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <script type="application/ld+json">
          {JSON.stringify([
            ...generateMediaSchemaArray(Schemabooks),
            ...generateMediaSchemaArray(Schemaseries),
          ])}
        </script>
      </Helmet>

      <div className="flex flex-col gap-6 p-16 px-3 max-w-6xl mx-auto items-center">
        <form onSubmit={handleSubmit} className='w-[450px]'>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>       
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">
          View all books
        </Link>
      </div>
      {/* News Section */}
      <Swiper navigation>
        {reviews && reviews.length > 0 && (
          <div className="flex flex-col gap-6">
            {reviews.map((book) => (
              <SwiperSlide className="flex flex-wrap justify-center gap-4">
                <BookCard key={book._id} book={book} />
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>

      <div className="p-3 flex flex-col gap-8 ">
        {/* Books Section */}
        {books && books.length > 0 && (
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-2xl font-semibold text-center">
              New Books Upload
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Button type="button" size="sm">
              <Link
                to={"/search?category=books"}
                className="text-lg text-white hover:underline text-center">
                Load more Books
              </Link>
            </Button>
          </div>
        )}

        {/* Series Section */}
        {series && series.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              New Series Upload
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {series.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Button type="button" size="sm">
              <Link
                to={"/search?category=series"}
                className="text-lg text-white hover:underline text-center">
                show more series
              </Link>
            </Button>
          </div>
        )}

        {/* Kdrama Section */}
        {kdramas && kdramas.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              New Kdramas Upload
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {kdramas.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Button type="button" size="sm">
              <Link
                to={"/search?category=kdrama"}
                className="text-lg text-white hover:underline text-center">
                show more Kdramas
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
