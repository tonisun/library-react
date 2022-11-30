import React from 'react'
import { Link } from 'react-router-dom'
import BookModel from '../../../models/BookModel'

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {

    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <Link to={"./../../../pdfs/Advanced Microservices.pdf"} target="_blank">
                    { props.book.img ? 
                        <img 
                            className="shadow"
                            src={props.book.img} 
                            width='250'
                            alt='book'
                        />
                        :
                        <img 
                            className="shadow"
                            src={require('./../../../Images/BooksImages/advanced.png')} 
                            width='250'
                            alt='book'
                        />
                    }
                </Link>
                <h6 className="mt-2">{props.book.title}</h6>
                <p>{props.book.author}</p>
                <a className="btn main-color text-white shadow" href="#">Reserve</a>
            </div>
        </div>
    )
}