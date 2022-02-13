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
      {!openModal && (
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
