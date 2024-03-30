import React from 'react'

const Heading = ({
    children,
    textSize='text-3xl',
    className='',
}) => {
  return (
    <div className={`font-bold  ${textSize} ${className}`} >{children}</div>
  )
}

export default Heading