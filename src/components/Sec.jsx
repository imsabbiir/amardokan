import React from 'react'

function Sec({ id, alt, title, sub, children }) {
  return (
    <section id={id} className={`py-24 ${alt ? "bg-bg2" : ""}`}>
    <div className="mx-auto max-w-6xl px-5">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>

        {sub && <p className="mt-4 text-lg text-mut">{sub}</p>}
      </div>

      {children}
    </div>
  </section>
  )
}

export default Sec

