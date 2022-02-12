const AuditoriumPage = () => {
  const { Link } = ReactRouterDOM;
  const { useState, useEffect } = React;
  const [setModal, setOpenModal] = useState(true);
  const [chatData, setChatData] = useState({
    chats: [],
  });
  const dummyQuestionChatData = [
    {
      userName: "Ken Doe",
      message: "Lorem ipsum dolor sit amet.",
      type: "user",
    },
    {
      userName: "Hobbs Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "user",
    },
    {
      userName: "Ken Doe",
      message: "Lorem ipsum dolor sit amet.",
      type: "user",
    },
    {
      userName: "Hobbs Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "user",
    },
    {
      userName: "Ken Doe",
      message: "Lorem ipsum dolor sit amet.",
      type: "user",
    },
    {
      userName: "Hobbs Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "user",
    },
  ];

  useEffect(() => {
    setChatData((prevState) => ({
      ...prevState,
      chats: dummyQuestionChatData,
    }));
  }, []);

  const Video = () => (
    <div
      className="ratio-16x9 pos-absolute bg-dark border-4 border-dark rounded-8 overflow-hidden"
      style={{
        left: "50%",
        width: "40%",
        transform: "translate(-50%, 0%)",
        top: "23%",
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
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
  const HandleMessageSend = (data) => {
    console.log("HandleMessageSend", data);
  };
  return (
    <>
      <Layout>
        <section className="ratio-screen">
          <div
            className="pos-absolute pin bg-contain bg-no-repeat"
            style={{
              backgroundImage: 'URL("./images/auditorium_61f5286ae19a1.jpg")',
            }}
          >
            <Video />
          </div>
          {!setModal && (
            <div
              onClick={() => setOpenModal(true)}
              className="pos-fixed p-8 bg-primary f-color-white rounded-4 pin-l-auto pin-t-50 pin-t50 pin-r m-8 shadow-lg no-underline opacity-65 hover:opacity-100 transition-all cursor-pointer"
            >
              <div className="flex-col text-center f-size-12 f-weight-medium">
                <span class="material-icons">question_answer</span>
                <span>Ask a Question</span>
              </div>
            </div>
          )}
        </section>
      </Layout>
      {setModal && (
        <Modal
          cover
          title="Help Desk"
          onClose={() => setOpenModal(false)}
          className="question-modal bg-white rounded-8 shadow-lg"
        >
          <div className="flex-stretch flex-col overflow-hidden pos-relative">
            <ChatBox
              data={chatData}
              onMessageSend={HandleMessageSend}
              style={{
                height: "",
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
