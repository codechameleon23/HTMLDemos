const DisplayChat = ({ chatMessages }) => {
  const { useRef, useEffect } = React;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const userThumb = (userName) => (
    <div className="flex-row align-center f-color-dark f-size-10 ml-auto mt-8">
      <div
        title={userName}
        className="ratio-1x1 icon-20 rounded-full f-weight-bold bg-primary f-color-white"
      >
        <span className="pos-absolute pin flex-col justify-center align-center">
          {userName.match(/\b(\w)/g).slice(0, 2)}
        </span>
      </div>
      {/* <span>{userName}</span> */}
    </div>
  );

  return (
    <div className="flex-col overflow-auto chat-message-area">
      {chatMessages?.length > 0 ? (
        chatMessages.map((chat, index) => {
          const isSelf = chat.type === "self";
          return (
            <div className="p-8 pos-relative">
              <div
                key={`chat-message-${index}`}
                className={`p-8 bg-light flex-col rounded-8 col-11 md:col-9 ${
                  isSelf ? "ml-auto" : ""
                }`}
              >
                <div className="p-8 bg-white f-color-dark f-size-14 rounded-8 shadow-lg">
                  {HTMLReactParser(chat.message)}
                </div>
                {!isSelf && userThumb(chat.userName)}
              </div>
            </div>
          );
        })
      ) : (
        <p>No Chat Found!</p>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
