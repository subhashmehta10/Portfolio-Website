function PageHero({ title, subtitle }) {
  return (
    <div className="hero">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}

export default PageHero


