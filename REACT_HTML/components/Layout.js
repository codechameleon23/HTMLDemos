const Layout = ({ children }) => {
  // const { useState } = React;
  const pathUrl = window.location.hash.split("?");
  const currentPath = pathUrl[0].split("#")[1];
  const params = new URLSearchParams(`?${pathUrl[1]}`);
  const modalType = params.get("openModal", "");

  return (
    <Route
      render={({ history }) => (
        <>
          <main className="flex-auto flex-col with-navigation">{children}</main>
          <Navigation />
          {modalType === "agenda" && (
            <Modal
              cover
              title="Agenda"
              onClose={() => history.push(currentPath)}
              className="container sm:container-sm bg-white rounded-8 shadow-lg"
            >
              <div className="flex-stretch flex-col overflow-auto pos-relative max-h-full">
                <img src="./images/agenda.jpg" />
              </div>
            </Modal>
          )}
          <div className="pos-fixed pin z-50 flex-row justify-center align-center bg-white text-center landscape:d-hidden">
            <div className="text-wrap f-weight-medium">
              <img src="./images/rotate.gif" />
              <p>Switch to Landscape view</p>
            </div>
          </div>
        </>
      )}
    />
  );
};
