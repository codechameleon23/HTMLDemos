const LoungePage = () => {
  const { useState, useEffect } = React;
  const [openModal, setOpenModal] = useState(true);
  const [chatData, setChatData] = useState({
    selectedUser: null,
    chats: [],
    allUsers: [],
  });
  const dummyChatData = [
    {
      userName: "John Doe",
      designation: "CEO",
      company: "Sun infotech",
      id: "jd1",
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
      userName: "Mark Tait",
      designation: "Manager",
      company: "Rragma tech",
      id: "mt1",
      chats: [
        {
          userName: "Mark Tait",
          message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          type: "",
        },
        {
          userName: "Mark Tait",
          message: "Quaerat doloribus perferendis",
          type: "",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur  voluptate suscipit ab totam ex.",
          type: "user",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet,  alias placeat velit voluptatum non tempoluptate suscipit ab totam ex.",
          type: "user",
        },
        {
          userName: "Mark Tait",
          message:
            "Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores",
          type: "",
        },
      ],
    },
    {
      userName: "Jenny Grett",
      designation: "Managing Director",
      company: "Indi tech",
      id: "jg1",
      chats: [
        {
          userName: "Jenny Grett",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
        {
          userName: "Jenny Grett",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "user",
        },
        {
          userName: "Ken Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "user",
        },
        {
          userName: "Jenny Grett",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
          type: "",
        },
      ],
    },
  ];

  useEffect(() => {
    setChatData((prevState) => ({
      ...prevState,
      allUsers: dummyChatData,
      // chats: dummyChatData[0].chats,
    }));
  }, []);

  const HandleMessageSend = (data) => {
    console.log("HandleMessageSend", data);
  };

  const handleUserSelect = (userId) => {
    const selectedUser = dummyChatData.find((user) => user.id === userId);
    if (selectedUser) {
      const { chats } = selectedUser;
      setChatData((prevState) => ({
        ...prevState,
        selectedUser,
        chats,
      }));
    }
  };

  return (
    <>
      <Layout>
        <BackgroundCover image={"./images/networking_lounge.jpg"}>
          <NavigationDots
            onClick={() => setOpenModal(true)}
            style={{
              left: "calc(43% - 0.8rem)",
              top: "calc(84% - 0.8rem)",
              width: "calc(10% + 1.6rem)",
              height: "calc(7% + 2.0rem)",
            }}
          />
        </BackgroundCover>
      </Layout>
      {openModal && (
        <Modal
          cover
          title="Help Desk"
          onClose={() => setOpenModal(false)}
          className="container md:container-md md:container-lg bg-white rounded-8 shadow-lg"
        >
          <div className="chat-box flex-stretch flex-col overflow-auto pos-relative">
            <ChatBox
              data={chatData}
              onUserSelect={handleUserSelect}
              onMessageSend={HandleMessageSend}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
