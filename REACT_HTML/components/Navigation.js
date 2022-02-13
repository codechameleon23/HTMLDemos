const Navigation = () => {
  const { NavLink } = ReactRouterDOM;
  // pagePaths id from  constant.js
  return pagePaths?.length > 0 ? (
    <nav className="pos-fixed z-10 pin-x pin-b bg-dark f-color-light">
      <ul className="flex-row justify-center list-reset f-size-14">
        {pagePaths.map((navLink, index) => {
          return (
            <li key={`${navLink.path}-${index}`} className="px-16 p-8">
              <NavLink
                activeClassName="f-color-primary"
                to={navLink.path}
                className="flex-col align-center no-underline hover:f-color-primary text-center"
              >
                <span class="material-icons m-8">{navLink.icon}</span>
                <span>{navLink.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  ) : null;
};
