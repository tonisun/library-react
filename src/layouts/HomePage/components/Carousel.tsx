import { ReturnBook } from "./ReturnBook"
import { useEffect, useState } from "react"
import BookModel from "../../../models/BookModel"
import { SpinnerLoading } from "../../Utils/SpinnerLoading"
import { Link } from "react-router-dom"

export const Carousel = () => {

    // 3 state Objects from Type useState
    const [books, setBooks] = useState<BookModel[]> ( [] )
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect ( () => {
        
        // a function
        const fetchBooks = async () => {
            
            // make request from API 
            const baseUrl: string = "http://localhost:8080/api/books"
            const url: string = `${baseUrl}?page=0&size=9`
           
            // make response = fetching Data from API url
            const response = await fetch (url)

            if (!response.ok) throw new Error('Something went wrong!')
            
            // as a JSON Data format 
            const responseJson = await response.json()

            // as an Array Data format trimt by: { "_embedded", "books" }
            const responseData = responseJson._embedded.books

            // an empty Array from Type BookModel Array
            const loadedBooks: BookModel[] = [] 

            // fill the empty BookModel Array from responseData Array
            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                })
            }

            setBooks(loadedBooks)
            setIsLoading(false)
        }

        // a function
        fetchBooks().catch((error: any)=> {
            
            setIsLoading(false)
            
            setHttpError(error.message)
        })
    }, [])

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 850 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book here.</h3>
            </div>
        
            <div 
                id='carouselExampleControls' 
                className='carousel carousel-dark slide mt-5 d-none d-lg-block' 
                data-bs-interval='false'
            >
                
                {/* Desktop */}
                <div className="carousel-inner">
                    
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(0, 3).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(3, 6).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(6, 9).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(3, 4).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(4, 5).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(5, 6).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(6, 7).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(7, 8).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            { books.slice(8, 9).map( book => (
                                <ReturnBook book = { book } key = {book.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <button 
                    className="carousel-control-prev" 
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide='prev'
                >
                    <span className="carousel-control-prev-icon shadow" aria-hidden='true'></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button 
                    className="carousel-control-next" 
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide='next'
                >
                    <span className="carousel-control-next-icon shadow" aria-hidden='true'></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book = { books[7] } key = { books[7].id }/>
                </div>
            </div> 
            
            <div className="homepage-carousel-title mt-3 justify-content-center align-items-center">
                <Link className="btn btn-outline-secondary btn-lg shadow" to={'/search'}>View More</Link>
            </div>
            
        </div>
    )
}