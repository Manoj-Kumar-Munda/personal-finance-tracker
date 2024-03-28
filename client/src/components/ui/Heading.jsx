import React from 'react'

const Heading = ({
    children,
    textSize='text-3xl',
    font='font-Poppins',
    className='',
}) => {
  return (
    <div className={`font-bold ${font} ${textSize} ${className}`} >{children}</div>
  )
}

export default Heading