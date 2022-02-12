const DisplayChat = ({ chats }) => {
  const { useRef, useEffect } = React;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const userThumb = (userName) => (
    <div className="flex-row align-center f-color-dark f-size-10 ml-auto mt-8">
      <div
        title={userName}
        className="ratio-1x1 icon-20 rounded-full f-weight-bold bg-primary f-color-white"
      >
        <span className="pos-absolute pin flex-col justify-center align-center">
          {/* {userName.match(/\b(\w)/g).slice(0, 2)} */}
          {getShortName(userName)}
        </span>
      </div>
      {/* <span>{userName}</span> */}
    </div>
  );

  const isChat = chats?.length > 0;

  return (
    <div className="chat-box-message-area">
      <div className="flex-col">
        {isChat ? (
          <>
            {chats.map((chat, index) => {
              const isUser = chat.type === "user";
              return (
                <div className="p-8 pos-relative">
                  <div
                    key={`chat-message-${index}`}
                    className={`p-8 bg-light flex-col rounded-8 col-11 md:col-9 ${
                      isUser ? "ml-auto" : ""
                    }`}
                  >
                    <div
                      className={`p-8 ${
                        isUser ? "bg-primary-light-400" : "bg-white"
                      } f-color-dark f-size-12 rounded-8 shadow-lg`}
                    >
                      {HTMLReactParser(chat.message)}
                    </div>
                    <div className="flex-row align-center justify-space-bertween pt-4 w-full f-size-10 f-color-light-200">
                      <span className="">12:00 AM </span>
                      <span className="ml-auto capitalize">
                        {chat.userName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </>
        ) : (
          <p className="f-size-14 f-weight-medium">No Chat Found!</p>
        )}
      </div>
    </div>
  );
};

// export default DisplayChat;
