
export const Movie = ({title, link}) => {
  return (
    <>
    <h4 className="title">{title}</h4>
    <img className="image_movie" src={link}></img>
    </>
  )
}
