import { BookCardProps } from '@/types'
import  Link from 'next/link'
import React from 'react'


const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`}>
      <img src={coverURL} alt={title} className='library-hero-image' />
      <div className='library-hero-content'>
        <h3 className='library-hero-title'>{title}</h3>
        <p className='library-hero-author'>{author}</p>
      </div>
    </Link>
  )
}

export default BookCard
