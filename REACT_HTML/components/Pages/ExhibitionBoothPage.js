const ExhibitionBoothPage = ({ match, history }) => {
  const { useState, useEffect } = React;
  // const { Link } = ReactRouterDOM;
  const { boothId } = match.params;
  const [openBrochuresModal, setOpenBrochuresModal] = useState(false);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [openExhibitorModal, setOpenExhibitorModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showVideoCallSchedlerBox, setShowVideoCallSchedlerBox] = useState(
    false
  );
  // const [showExhibitorsList, setShowExhibitorsList] = useState(true);
  const [chatData, setChatData] = useState({
    selectedUser: null,
    chats: [],
    allUsers: [],
  });

  const dummyChatData = [
    {
      userName: "Japsi",
      designation: "Exhibitor",
      // company: "Sun infotech",
      id: "japsi",
      chats: [
        {
          userName: "John Doe",
          message:
            "Lorem ipsum dolo similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis.",
          type: "user",
        },
        {
          userName: "John Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "user",
        },
        {
          userName: "John Doe",
          message: "Loremb totam ex.",
          type: "",
        },
      ],
    },
    {
      userName: "Nikita",
      designation: "Exhibitor",
      // company: "Sun infotech",
      id: "nikita",
      chats: [
        {
          userName: "John Doe",
          message:
            "Lorem ipsum dolo similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis.",
          type: "user",
        },
        {
          userName: "John Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
      ],
    },
  ];

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
  const BrochuresList = [
    {
      name: "SpeedHire E-Book 1",
      url:
        "https://virtualapi.multitvsolution.com/exhibitions/brochure/20220129184935_SpeedHire%20E-Book%201.pdf",
    },
    {
      name: "SpeedHire E-Book 2",
      url:
        "https://virtualapi.multitvsolution.com/exhibitions/brochure/20220129184935_SpeedHire%20E-Book%201.pdf",
    },
    {
      name: "SpeedHire E-Book 3",
      url:
        "https://virtualapi.multitvsolution.com/exhibitions/brochure/20220129184935_SpeedHire%20E-Book%201.pdf",
    },
    {
      name: "SpeedHire E-Book 4",
      url:
        "https://virtualapi.multitvsolution.com/exhibitions/brochure/20220129184935_SpeedHire%20E-Book%201.pdf",
    },
  ];

  const ExhibitorCard = ({ exhibitor }) => {
    const { userName, id } = exhibitor;
    return (
      <div className="p-8 col-flex">
        <div className="p-8 bg-primary-light-400 rounded-4 flex-col align-center text-center">
          <div className="icon icon-64 ratio-1x1 f-color-primary">
            {/* <figure className="bg-center bg-contain bg-no-repeat" style="background-image: url('./images/)"></figure> */}
            <span class="pos-absolute pin material-icons md-48 f-size-64">
              support_agent
            </span>
          </div>
          <div className="p-8 text-wrap-sm">
            <p className="f-weight-semiBold">{userName}</p>
            <div
              onClick={() => onExhibitorSelect(id, "chat")}
              className="icon icon-40 mx-8 rounded-full bg-dark f-color-light cursor-pointer"
            >
              <div className="pos-absolute pin p-8">
                <span class="material-icons">question_answer</span>
              </div>
            </div>
            <div
              onClick={() => onExhibitorSelect(id, "video")}
              className="icon icon-40 mx-8 rounded-full bg-dark f-color-light cursor-pointer"
            >
              <div className="pos-absolute pin p-8">
                <span class="material-icons">videocam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleModalClose = () => {
    setChatData({
      allUsers: dummyChatData,
      selectedUser: null,
      chats: [],
    });
    setOpenBrochuresModal(false);
    setOpenEnquiryModal(false);
    setOpenExhibitorModal(false);
    setShowChatBox(false);
    setShowVideoCallSchedlerBox(false);
    setShowSuccessMessage(false);
  };

  const handleEnqurySubmit = (data) => {
    console.log("Enquiry Form data", data);
  };

  const HandleMessageSend = (data) => {
    console.log("Send message data", data);
  };

  const HandleScheduleSelect = (data) => {
    console.log("Selected Schedule date", data);
    if (data) {
      setShowSuccessMessage("Schedule Successfully!");
      setTimeout(() => {
        handleModalClose();
      }, 1500);
    }
  };

  const onExhibitorSelect = (userId, type) => {
    const selectedUser = dummyChatData.find((user) => user.id === userId);
    if (selectedUser) {
      if (type === "video") {
        setChatData((prevState) => ({
          ...prevState,
          allUsers: [{ ...selectedUser }],
          selectedUser,
        }));
        setShowChatBox(false);
        setShowVideoCallSchedlerBox(true);
      } else {
        const { chats } = selectedUser;
        setChatData((prevState) => ({
          ...prevState,
          allUsers: [{ ...selectedUser }],
          selectedUser,
          chats,
        }));
        setShowVideoCallSchedlerBox(false);
        setShowChatBox(true);
      }
    }
  };

  useEffect(() => {
    setChatData((prevState) => ({
      ...prevState,
      allUsers: dummyChatData,
      // chats: dummyChatData[0].chats,
    }));
  }, []);

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
      <div className="pos-fixed pin-r pin-t-50 pin-t50 flex-col justify-end m-16">
        <button
          onClick={() => setOpenBrochuresModal(true)}
          className="icon-button pos-relative my-4 p-8 bg-white hover:bg-primary f-color-primary hover:f-color-white rounded-full shadow-lg flex-row align-center cursor-pointer ml-auto"
        >
          <span class="material-icons">auto_stories</span>
          <span className="label">
            <span className="pl-4">Brochures</span>
          </span>
        </button>
        <button
          onClick={() => setOpenEnquiryModal(true)}
          className="icon-button pos-relative my-4 p-8 bg-white hover:bg-primary f-color-primary hover:f-color-white rounded-full shadow-lg flex-row align-center cursor-pointer ml-auto"
        >
          <span class="material-icons">help_outline</span>
          <span className="label">
            <span className="pl-4">Enquiry&nbsp;Form</span>
          </span>
        </button>
        <button
          onClick={() => setOpenExhibitorModal(true)}
          className="icon-button pos-relative my-4 p-8 bg-white hover:bg-primary f-color-primary hover:f-color-white rounded-full shadow-lg flex-row align-center cursor-pointer ml-auto"
        >
          <span class="material-icons">support_agent</span>
          <span className="label">
            <span className="pl-4">Exhibitor&nbsp;Chat</span>
          </span>
        </button>
      </div>
      <div
        className="pos-fixed pin-t pin-l m-16"
        onClick={() => history.push("/exhibition")}
      >
        <button className="f-color-white px-12 py-4 f-size-14 f-weight-medium capitalize rounded-full cursor-pointer">
          <div className="pos-absolute pin bg-dark opacity-65 pointer-events-none rounded-full"></div>
          <div className="flex-row align-center pos-relative">
            <span class="material-icons mr-8">arrow_back</span>
            <span>Back</span>
          </div>
        </button>
      </div>
      {openBrochuresModal && (
        <Modal
          cover
          title="Brochures"
          onClose={() => handleModalClose()}
          className="container md:container-md bg-white rounded-8 shadow-lg"
        >
          <div className="flex-stretch flex-col overflow-hidden pos-relative">
            {BrochuresList && (
              <Tabel
                headers={["#", "name", "View"]}
                rows={BrochuresList.map((brochure, index) => [
                  index + 1,
                  brochure.name,
                  <a
                    className="f-color-primary"
                    href={brochure.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="material-icons">visibility</span>
                  </a>,
                ])}
              />
            )}
          </div>
        </Modal>
      )}
      {openEnquiryModal && (
        <Modal
          cover
          noblur
          title="Enqury Form"
          onClose={() => handleModalClose()}
          className="container md:container-md bg-white rounded-8 shadow-lg"
        >
          <div className="flex-stretch flex-col overflow-hidden pos-relative p-8">
            <EnquiryForm onSubmit={handleEnqurySubmit} />
          </div>
        </Modal>
      )}
      {openExhibitorModal && (
        <Modal
          cover
          title="Exhibitor Chat"
          onClose={() => handleModalClose()}
          className="container md:container-md bg-white rounded-8 shadow-lg"
        >
          <div
            className={`${
              showChatBox || showVideoCallSchedlerBox ? "chat-box" : ""
            } flex-stretch flex-col overflow-hidden pos-relative`}
          >
            {!(showChatBox || showVideoCallSchedlerBox) && (
              <div className="flex-row flex-wrap ">
                {chatData?.allUsers.map((exhibitor, index) => {
                  return (
                    <ExhibitorCard
                      key={`exhibitor-${index}`}
                      exhibitor={exhibitor}
                    />
                  );
                })}
              </div>
            )}
            {showChatBox && (
              <ChatBox
                data={chatData}
                onMessageSend={HandleMessageSend}
                style={{
                  height: "",
                }}
              />
            )}
            {showVideoCallSchedlerBox && (
              <VideoCallSchedlerBox
                data={chatData}
                onScheduleSelect={HandleScheduleSelect}
                successMessage={showSuccessMessage}
                style={{
                  height: "",
                }}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  ) : (
    <Redirect to="/404" />
  );
};
