const ExhibitionPage = () => {
  return (
    <>
      <Layout>
        <BackgroundCover image={"./images/exhibition.jpg"}>
          <NavigationDots
            to="/exhibition/booth-1"
            style={{
              left: "calc(19.5% - 0.8rem)",
              top: "calc(68% - 0.8rem)",
              width: "calc(10% + 1.6rem)",
              height: "calc(7% + 2.0rem)",
            }}
          />
          <NavigationDots
            to="/exhibition/booth-2"
            style={{
              left: "calc(67% - 0.8rem)",
              top: "calc(68% - 0.8rem)",
              width: "calc(10% + 1.6rem)",
              height: "calc(7% + 2.0rem)",
            }}
          />
        </BackgroundCover>
      </Layout>
    </>
  );
};
