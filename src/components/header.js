import React from "react"

const Header = () => {
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__ellipse" />
        <div className="header__info">
          <div className="header__info__name">Julie Howard</div>
          <div className="header__info__position">Admin</div>
        </div>
      </div>
    </div>
  )
}


export default React.memo(Header)

