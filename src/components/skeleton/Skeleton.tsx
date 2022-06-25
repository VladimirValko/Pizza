import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
    <ContentLoader 
    className="pizza-block" // кастомный класс что бы скелетоны вставали в ряд как и пиццы
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="17" y="121" rx="0" ry="0" width="4" height="0" /> 
    <circle cx="133" cy="126" r="126" /> 
    <rect x="0" y="271" rx="16" ry="16" width="280" height="27" /> 
    <rect x="1" y="324" rx="13" ry="13" width="280" height="76" /> 
    <rect x="0" y="420" rx="20" ry="20" width="90" height="26" /> 
    <rect x="114" y="420" rx="13" ry="13" width="162" height="26" />
  </ContentLoader>
)

export default Skeleton