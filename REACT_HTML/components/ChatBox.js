const ChatBox = ({ chatOnly, data, onUserSelect, onMessageSend }) => {
  const { selectedUser, chats, allUsers } = data;
  const handleSubmit = (message) => {
    onMessageSend(message);
  };

  // const bgAvtars = (userName) => `https://ui-avatars.com/api/?size=64&name=${userName}`;

  return (
    <>
      {!chatOnly && allUsers?.length > 0 && (
        <ChatBoxUserList
          users={allUsers}
          selectedUserId={selectedUser?.id}
          onSelect={onUserSelect}
        />
      )}
      <DisplayChat chats={chats} />
      <AddMessageForm onSubmit={handleSubmit} />
    </>
  );
};
