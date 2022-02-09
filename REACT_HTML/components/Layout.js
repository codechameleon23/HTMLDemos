const Layout = ({ children, bodyChildren }) => {
  return (
    <>
      <main className="flex-auto flex-col with-navigation">{children}</main>
      {bodyChildren}
      <Navigation />
    </>
  );
};
