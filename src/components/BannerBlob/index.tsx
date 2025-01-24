import React, { useState } from 'react'
import { motion } from 'motion/react'

const BannerBlob = () => {
  // stateful variables for blob size coordinates. used for animating the three blobs
  const [blob, setBlob] = useState([20, 30, 10, 10])
  const initialBlob = {
    top: '10%',
    right: '40%',
    bottom: '5%',
    left: '2%',
  }
  const randomNumber = (low: number, high: number) => Math.floor(Math.random() * (high - low) + low)

  function setNewCoordinates() {
    const newCoordinates: number[] = []
    let i = 0
    while (i < 4) {
      newCoordinates.push(randomNumber(0, 40))
      i++
    }
    setBlob(newCoordinates)
  }

  return (
    <motion.div
      className="rounded-full bg-primary absolute"
      onAnimationComplete={setNewCoordinates}
      initial={initialBlob}
      animate={{
        top: `${blob[0]}%`,
        right: `${blob[1]}%`,
        bottom: `${blob[2]}%`,
        left: `${blob[3]}%`,
      }}
      transition={{ duration: 20 }}
    />
  )
}

export default BannerBlob
