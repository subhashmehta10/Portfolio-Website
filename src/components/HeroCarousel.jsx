import { useEffect, useState } from 'react'

function HeroCarousel({ images = [], intervalMs = 3500 }) {
  const [index, setIndex] = useState(0)
  const numSlides = images.length

  useEffect(() => {
    if (numSlides <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % numSlides), intervalMs)
    return () => clearInterval(t)
  }, [numSlides, intervalMs])

  function prev() { setIndex((i) => (i - 1 + numSlides) % numSlides) }
  function next() { setIndex((i) => (i + 1) % numSlides) }

  if (numSlides === 0) return null

  return (
    <div className="carousel" role="region" aria-label="Promotions">
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <div className="carousel__slide" key={i} aria-hidden={i !== index}>
            <img src={src} alt="Promotion" />
          </div>
        ))}
      </div>
      {numSlides > 1 && (
        <>
          <button className="carousel__btn carousel__btn--prev" aria-label="Previous" onClick={prev}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel__btn carousel__btn--next" aria-label="Next" onClick={next}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="carousel__dots">
            {images.map((_, i) => (
              <button key={i} className={`carousel__dot ${i === index ? 'is-active' : ''}`} aria-label={`Go to slide ${i+1}`} onClick={() => setIndex(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HeroCarousel


