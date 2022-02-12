const ChatBoxUserList = ({ users, selectedUserId, onSelect }) => {
  return (
    <div className="chat-box-userlist">
      {users.map((user, index) => (
        <div
          onClick={() => onSelect(user.id)}
          key={`${user.id}-${index}`}
          className={`flex-row align-center p-8 border-b border-light-100 hover:bg-primary-light-300 cursor-pointer transition-all ${
            selectedUserId === user.id ? "bg-primary-light-300" : ""
          }`}
        >
          <div className="icon-40 ratio-1x1 rounded-full bg-primary mr-8">
            <span className="pos-absolute pin flex-col justify-center align-center">
              <span className="f-weight-medium">
                {getShortName(user.userName)}
              </span>
            </span>
          </div>
          <div className="">
            <h3 className="max-w-100 truncate f-weight-medium capitalize">
              {user.userName}
            </h3>
            <div className="f-size-10 f-color-primary-dark-200">
              <p className="f-size-10 f-weight-semiBold capitalize">
                {user.designation}
              </p>
              <p className="f-size-12 f-weight-semiBold capitalize">
                {user.company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
