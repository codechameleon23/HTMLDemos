const Navigation = () => {
  const { NavLink  } = ReactRouterDOM;
  const navLinks = [
    {
      path: "/lobby",
      label: "Lobby",
      icon: "home",
    },
    {
      path: "/auditorium",
      label: "Auditorium",
      icon: "desktop_windows",
    },
    {
      path: "/exhibiton",
      label: "Exhibiton",
      icon: "group",
    },
    {
      path: "/lounge",
      label: "Networking Lounge",
      icon: "weekend",
    },
    {
      path: "javacsript:void(0);",
      label: "Agenda",
      icon: "view_agenda",
    },
    {
      path: "/appointments",
      label: "Appointments",
      icon: "assignment",
    },
    {
      path: "/login",
      label: "Logout",
      icon: "logout",
    },
  ];
  return (
    <nav className="pos-fixed z-10 pin-x pin-b bg-dark">
      <ul className="flex-row justify-center list-reset f-size-14">
        {navLinks.map((navLink, index) => {
          return (
            <li key={`${navLink.path}-${index}`} className="px-16 p-8">
              <NavLink 
                activeClassName="f-color-primary"
                to={navLink.path}
                className="flex-col align-center no-underline hover:f-color-primary text-center"
              >
                <span class="material-icons m-8">{navLink.icon}</span>
                <span className="f-weight-medium">{navLink.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
