const LobbyPage = () => {
  const NavigationDots = ({ ...rest }) => {
    // opacity-0 hover:opacity-100 opacity-parent-0 hover:opacity-parent-25
    return (
      <a
        className="pos-absolute pin-t pin-l flex-col border-2 border-transparent hover:border-primary rounded-4 shadow-lg transition-all"
        {...rest}
      >
        <div className="pos-absolute bg-primary h-full w-full opacity-0 hover:opacity-25"></div>
        <div className="icon-20 ratio-1x1 pin-tl-50 pin-tl50 z-0 mt-24 pointer-events-none">
          <span className="pos-absolute pin rounded-full bg-error ping"></span>
          <span className="pos-absolute pin rounded-full bg-error"></span>
        </div>
      </a>
    );
  };
  return (
    <>
      <main className="flex-auto flex-col with-navigation">
        <section className="ratio-screen">
          <div
            className="pos-absolute pin bg-contain bg-no-repeat"
            style={{
              backgroundImage: 'URL("./images/lobby.jpg")',
            }}
          >
            <NavigationDots
              href="#"
              style={{
                left: "calc(21.3% - .8rem)",
                top: "calc(51.3% - .8rem)",
                width: "calc(8.2% + 1.6rem)",
                height: "calc(20.3% + 1.6rem)",
              }}
            />
            <NavigationDots
              href="#"
              style={{
                left: "calc(69.7% - .8rem)",
                top: "calc(51.3% - .8rem)",
                width: "calc(8.2% + 1.6rem)",
                height: "calc(20.3% + 1.6rem)",
              }}
            />
            <NavigationDots
              href="#"
              style={{
                left: "calc(41.6% - 0.8rem)",
                top: "calc(67% - 0.8rem)",
                width: "calc(17.5% + 1.6rem)",
                height: "calc(10.1% + 1.6rem)",
              }}
            />
            <NavigationDots
              href="/appointments.html"
              style={{
                left: "calc(17.6% - 0.8rem)",
                top: "calc(33.1% - 0.8rem)",
                width: "calc(9.2% + 1.6rem)",
                height: "calc(7.6% + 1.6rem)",
              }}
            />
            <NavigationDots
              href="/exhibiton.html"
              style={{
                left: "calc(71.6% - 0.8rem)",
                top: "calc(33.1% - 0.8rem)",
                width: "calc(9.2% + 1.6rem)",
                height: "calc(7.6% + 1.6rem)",
              }}
            />
          </div>
        </section>
      </main>
      <Navigation />
    </>
  );
};
