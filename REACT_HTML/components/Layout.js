const Layout = ({ children }) => {
  return (
    <>
      <main className="flex-auto flex-col with-navigation">{children}</main>
      <Navigation />
      {/* <FloatingNavigation /> */}
    </>
  );
};
