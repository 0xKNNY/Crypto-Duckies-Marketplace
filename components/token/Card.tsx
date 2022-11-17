import { FC } from 'react'

const Card: FC = ({ children }) => {
  return (
    <article className="col-span-full rounded-2xl border bg-white p-6 dark:bg-black">
      {children}
    </article>
  )
}

export default Card
