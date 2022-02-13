const LobbyPage = () => {
  return (
    <Layout>
      <BackgroundCover image={"./images/lobby.jpg"}>
        <NavigationDots
          to="/"
          style={{
            left: "calc(21.3% - .8rem)",
            top: "calc(51.3% - .8rem)",
            width: "calc(8.2% + 1.6rem)",
            height: "calc(20.3% + 1.6rem)",
          }}
        />
        <NavigationDots
          to="/lounge"
          style={{
            left: "calc(69.7% - .8rem)",
            top: "calc(51.3% - .8rem)",
            width: "calc(8.2% + 1.6rem)",
            height: "calc(20.3% + 1.6rem)",
          }}
        />
        <NavigationDots
          to="/"
          style={{
            left: "calc(41.6% - 0.8rem)",
            top: "calc(67% - 0.8rem)",
            width: "calc(17.5% + 1.6rem)",
            height: "calc(10.1% + 1.6rem)",
          }}
        />
        <NavigationDots
          to="/auditorium"
          style={{
            left: "calc(17.6% - 0.8rem)",
            top: "calc(33.1% - 0.8rem)",
            width: "calc(9.2% + 1.6rem)",
            height: "calc(7.6% + 1.6rem)",
          }}
        />
        <NavigationDots
          to="/exhibiton"
          style={{
            left: "calc(71.6% - 0.8rem)",
            top: "calc(33.1% - 0.8rem)",
            width: "calc(9.2% + 1.6rem)",
            height: "calc(7.6% + 1.6rem)",
          }}
        />
        <VideoFrame
          url="https://d3ep09c8x21fmh.cloudfront.net/techgig/speedhire.mp4"
          style={{
            left: "49.8%",
            width: "19.25%",
            transform: "translate(-50%, 0)",
            top: "30.2%",
          }}
          allow="autoplay"
        />
      </BackgroundCover>
    </Layout>
  );
};

// export default LobbyPage;
