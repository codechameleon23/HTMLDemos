// import DisplayChat from "./DisplayChat.js";
// import AddMessageForm from "./DisplayChat.js";

const ChatBox = ({ chatMessages }) => {
  const { useState } = React;
  const [messages, setMessages] = useState(chatMessages || []);
  console.log("messages", messages);
  const handleSubmit = (message) => {
    setMessages((prevState) => [
      ...prevState,
      {
        userName: "Mark Doe",
        message: message,
        type: "user",
      },
    ]);
  };
  return (
    <>
      <DisplayChat chatMessages={messages} />
      <AddMessageForm onSubmit={handleSubmit} />
    </>
  );
};
