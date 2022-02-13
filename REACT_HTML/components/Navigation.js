const Navigation = () => {
  const { useState } = React;
  const { NavLink } = ReactRouterDOM;
  const [openMenu, setOpenMenu] = useState(false);
  // pagePaths id from  constant.js
  return pagePaths?.length > 0 ? (
    <>
      <div
        className="navbar-toggle p-8 m-16 d-inline-flex lg:d-hidden z-40 transition-all f-color-white bg-primary rounded-4 pos-fixed pin-t pin-r"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <i
          class={`icon icon-16 my-auto hamburger pointer-events-auto ${
            openMenu ? "is-active" : ""
          }`}
        >
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </i>
      </div>
      <nav
        className={`navbar pos-fixed z-10 pin-t lg:pin-t-auto lg:pin-x pin-b f-color-light flex-col justify-center lg:pin-r ${
          openMenu ? "open-menu" : ""
        }`}
      >
        <div className="pos-absolute pin bg-dark opacity-75"></div>
        <ul className="flex-col lg:flex-row justify-center list-reset f-size-12 lg:f-size-14 pos-relative">
          {pagePaths.map((navLink, index) => {
            return (
              <li key={`${navLink.path}-${index}`} className="px-16 py-4 lg:py-8">
                <NavLink
                  activeClassName="f-color-primary"
                  to={navLink.path}
                  className="flex-row lg:flex-col align-center no-underline hover:f-color-primary text-center"
                >
                  <span class="material-icons m-8">{navLink.icon}</span>
                  <span>{navLink.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  ) : null;
};
