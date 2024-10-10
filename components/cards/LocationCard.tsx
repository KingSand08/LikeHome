import Image from 'next/image'
import React from 'react'

const LocationCard = () => {
  return (
    // make your own card
    <div>
        <Image width={100} height={100} src="/stellarHorizons" alt={''} />
        <p>Info1</p>
        <p>Info1</p>
        <p>Info1</p>
    </div>
  )
}

export default LocationCard