const LoungePage = () => {
  const { useState } = React;
  const [openModal, setOpenModal] = useState(false);
  const chatData = [
    {
      userName: "Mark Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "",
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
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "user",
    },
    {
      userName: "Hobbs Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "user",
    },
    {
      userName: "Lenny Doe",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat doloribus perferendis fugiat alias placeat velit voluptatum non tempore sunt impedit repellendus, similique debitis asperiores consequatur, voluptate suscipit ab totam ex.",
      type: "",
    },
  ];

  return (
    <>
      <main className="flex-auto flex-col">
        <section className="my-auto">
          <div className="container container-xl mx-auto">
            <button
              className="bg-primary p-8"
              onClick={() => setOpenModal(true)}
            >
              Open
            </button>
          </div>
        </section>
      </main>
      <Navigation />
      {openModal && (
        <Modal title="Chat" onClose={() => setOpenModal(false)}>
          <ChatBox chatMessages={chatData} />
        </Modal>
      )}
    </>
  );
};
