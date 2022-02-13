const ExhibitionBoothPage = ({ match, history }) => {
  const { boothId } = match.params;
  console.log("boothId", boothId);
  const Booths = {
    "booth-1": {
      image: "./images/booth-1.jpg",
      video: "https://d3ep09c8x21fmh.cloudfront.net/techgig/speedhire.mp4",
    },
    "booth-2": {
      image: "./images/booth-2.jpg",
      video: "https://d3ep09c8x21fmh.cloudfront.net/techgig/speedhire.mp4",
    },
  };
  const isBooth = Booths[boothId];
  return isBooth ? (
    <>
      <Layout>
        <BackgroundCover image={isBooth.image}>
          <VideoFrame
            url={isBooth.video}
            style={{
              left: "50.5%",
              width: "13.4%",
              top: "50.7%",
              transform: "translateX(0, 0)",
            }}
          />
        </BackgroundCover>
      </Layout>
      <div
        className="pos-fixed pin-t pin-l m-8"
        onClick={() => history.push("/exhibition")}
      >
        <button className="bg-dark hover:bg-primary-600 f-color-white border-2 border-primary px-24 py-8 f-size-16 f-weight-medium capitalize rounded-full">
          <div className="flex-row align-center">
            <span class="material-icons mr-8">arrow_back</span>
            <span>Go Back</span>
          </div>
        </button>
      </div>
    </>
  ) : (
    <Redirect to="/404" />
  );
};
