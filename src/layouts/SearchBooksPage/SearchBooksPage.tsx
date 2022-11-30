import { validateHeaderValue } from 'http'
import { useEffect, useState } from 'react'
import BookModel from '../../models/BookModel'
import { Pagination } from '../Utils/Pagination'
import { SpinnerLoading } from '../Utils/SpinnerLoading'
import { SearchBook } from './components/SearchBook'

export const SearchBooksPage = () => {

    // 3 state Objects from Type useState
    const [ books, setBooks ] = useState<BookModel[]> ( [] )
    const [ isLoading, setIsLoading ] = useState (true)
    const [ httpError, setHttpError ] = useState (null)
    const [ currentPage, setCurrentPage ] = useState (1)
    const [ booksPerPage ] = useState (5)
    const [ totalAmountOfBooks, setTotalAmountOfBooks ] = useState (0)
    const [ totalPages, setTotalPages ] = useState (0)
    const [ search, setSearch ] = useState ('')
    const [ searchUrl, setSearchUrl ] = useState ('')
    const [ categorySelection, setCategorySelection ] = useState ('Book category')

    useEffect ( () => {
        
        // a function
        const fetchBooks = async () => {
            
            // make request from API 
            const baseUrl: string = "http://localhost:8080/api/books"
            let url: string = ''

            if ( searchUrl === '' ) {
                url = `${ baseUrl }?page=${ currentPage - 1 }&size=${ booksPerPage }`
            } else {
                url = baseUrl + searchUrl 
            }
           
            // make response = fetching Data from API url
            const response = await fetch (url)

            if (!response.ok) throw new Error('Something went wrong!')
            
            // as a JSON Data format 
            const responseJson = await response.json()

            // as an Array Data format trimt by: { "_embedded", "books" }
            const responseData = responseJson._embedded.books

            setTotalAmountOfBooks ( responseJson.page.totalElements )
            setTotalPages ( responseJson.page.totalPages )

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

        //scroll the page to the top
        window.scrollTo ( 0, 0 )

    }, [currentPage, searchUrl])

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

    const searchHandleChange =  () => {
        if ( search === '' ) {
            setSearchUrl ('')
        } else {
            setSearchUrl (`/search/findByTitleContaining?title=${ search }&page=0&size=${ booksPerPage }`)
        }
    }

    const categoryDropDownChange = ( value: string ) => {
        if (
            value.toLowerCase() === 'fe' ||
            value.toLowerCase() === 'be' ||
            value.toLowerCase() === 'data' ||
            value.toLowerCase() === 'devops'
        ) {
            setCategorySelection(value)
            setSearchUrl(`/search/findByCategory?category=${ value }&page=0&size=${ booksPerPage }`)
        }  else {
            setCategorySelection('All')
            setSearchUrl(`?page=0&size=${ booksPerPage }`)
        }
    }


    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks

    const paginate = ( pageNumber: number ) => setCurrentPage ( pageNumber )

    return (
        <div className=''>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input 
                                    className='form-control me-2 shadow' 
                                    type="search" 
                                    placeholder='Search' 
                                    aria-labelledby='Search'
                                    onChange={ event => setSearch ( event.target.value)} 
                                />
                                <button 
                                    className='btn btn-outline-success shadow' 
                                    onClick={ () => searchHandleChange() }
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle shadow' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    { categorySelection }
                                </button>
                                <ul className='dropdown-menu shadow' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={ () => categoryDropDownChange('All') }>
                                        <a className='dropdown-item' href="#">All</a>
                                    </li>
                                    <li onClick={ () => categoryDropDownChange('desc') }>
                                        <a className='dropdown-item' href="#">Decription</a>
                                    </li>
                                    <li onClick={ () => categoryDropDownChange('fe') }>
                                        <a className='dropdown-item' href="#">Front End</a>
                                    </li>
                                    <li onClick={ () => categoryDropDownChange('be') }>
                                        <a className='dropdown-item' href="#">Back End</a>
                                    </li>
                                    <li onClick={ () => categoryDropDownChange('data') }>
                                        <a className='dropdown-item' href="#">Data</a>
                                    </li>
                                    <li onClick={ () => categoryDropDownChange('devops') }>
                                        <a className='dropdown-item' href="#">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    { totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({ totalAmountOfBooks })</h5>
                            </div>
                            <p>
                                { indexOfFirstBook + 1 } to { lastItem } of { totalAmountOfBooks } items:
                            </p>
                            { books.map ( book => (
                                <SearchBook book = { book } key = { book.id } />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for ?
                            </h3>
                            <a type='button' className='btn btn-md main-color px-4 me-md-2 fw-bold text-white' href='#'>
                                Library Services
                            </a>
                        </div>
                    }
                    
                    { totalPages > 1 && 
                        <Pagination currentPage={ currentPage } totalPages={ totalPages } paginate={ paginate } />
                    }
                </div>
            </div>
        </div>
    )
}