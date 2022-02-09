const Navigation = () => {
  const navLinks = [
    {
      path: "/",
      label: "Lobby",
      icon: "home",
    },
    {
      path: "/auditorium.html",
      label: "Auditorium",
      icon: "desktop_windows",
    },
    {
      path: "/exhibiton.html",
      label: "Exhibiton",
      icon: "group",
    },
    {
      path: "/lounge.html",
      label: "Networking Lounge",
      icon: "weekend",
    },
    {
      path: "javacsript:void(0);",
      label: "Agenda",
      icon: "view_agenda",
    },
    {
      path: "/appointments.html",
      label: "Appointments",
      icon: "assignment",
    },
    {
      path: "/",
      label: "Logout",
      icon: "logout",
    },
  ];
  return (
    <nav className="pos-fixed pin-x pin-b bg-dark">
      <ul className="flex-row justify-center list-reset">
        {navLinks.map((navLink, index) => {
          return (
            <li key={`${navLink.path}-${index}`} className="px-24 p-8">
              <a
                href={navLink.path}
                className={`flex-col align-center no-underline hover:f-color-primary ${
                  navLink.path === pathname ? "f-color-primary" : ""
                }`}
              >
                <span class="material-icons m-8">{navLink.icon}</span>
                <span className="f-weight-medium">{navLink.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
