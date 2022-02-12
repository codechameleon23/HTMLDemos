const LobbyPage = () => {
  const Video = () => (
    <div
      className="ratio-16x9 pos-absolute bg-dark border-4 border-dark rounded-8 overflow-hidden"
      style={{
        left: "49.8%",
        width: "19.25%",
        transform: "translate(-50%, 0)",
        top: "30.2%",
      }}
    >
      <video
        className="pos-absolute pin"
        width="100%"
        // muted
        preload="auto"
        playsinline
        // autoplay=""
        controls
        loop
      >
        <source
          src="https://d3ep09c8x21fmh.cloudfront.net/techgig/speedhire.mp4"
          type="video/mp4"
        />{" "}
        Your browser does not support the video tag.
      </video>
    </div>
  );
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
        <Video />
      </BackgroundCover>
    </Layout>
  );
};

// export default LobbyPage;
