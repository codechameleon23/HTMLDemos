const AuditoriumPage = () => {
  // const { Link } = ReactRouterDOM;
  const { useState, useEffect } = React;
  const [openModal, setOpenModal] = useState(false);
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

  const HandleMessageSend = (data) => {
    console.log("HandleMessageSend", data);
  };

  const handleReaction = (type) => {
    console.log("reaction", type);
  };
  return (
    <>
      <Layout>
        <section className="ratio-screen">
          <div
            className="pos-absolute pin bg-contain bg-no-repeat"
            style={{
              backgroundImage: 'URL("./images/auditorium.jpg")',
            }}
          >
            <VideoFrame
              url="https://d3ep09c8x21fmh.cloudfront.net/techgig/speedhire.mp4"
              style={{
                width: "40%",
                transform: "translate(-50%, 0%)",
                top: "23%",
              }}
            />
          </div>
        </section>
      </Layout>
      <div className="pos-fixed pin-b lg:pin-b-50 lg:pin-b50 pin-l pin-r-auto flex-col m-8">
        <div className="pos-absolute pin bg-dark opacity-65 rounded-8"></div>
        <div className="flex-row lg:flex-col pos-relative">
          <ReactionButton
            className="m-4 p-8 f-size-32 hover:bg-primary-light-400 rounded-8"
            type="clap"
            onClick={handleReaction}
            title="Applause"
          >
            👏
          </ReactionButton>
          <ReactionButton
            className="m-4 p-8 f-size-32 hover:bg-primary-light-400 rounded-8"
            type="like"
            onClick={handleReaction}
            title="Like it"
          >
            👍
          </ReactionButton>
          <ReactionButton
            className="m-4 p-8 f-size-32 hover:bg-primary-light-400 rounded-8"
            type="heart"
            onClick={handleReaction}
            title="Love it"
          >
            ❤️
          </ReactionButton>
        </div>
      </div>
      {!openModal && (
        <div
          onClick={() => setOpenModal(true)}
          className="pos-fixed pin-b lg:pin-b-50 lg:pin-b50 pin-r p-8 m-8 shadow-lg no-underline cursor-pointer"
        >
          <div className="bg-dark lg:bg-primary pos-absolute pin bg-dark opacity-65 rounded-8"></div>
          <div className="flex-col text-center f-size-12 f-weight-medium pos-relative f-color-white">
            <span class="material-icons">question_answer</span>
            <span>Ask a Question</span>
          </div>
        </div>
      )}
      {openModal && (
        <Modal
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
