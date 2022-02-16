const VideoCallSchedlerBox = ({
  schedulePickerOnly,
  data,
  onUserSelect,
  onScheduleSelect,
  successMessage,
}) => {
  const { useState } = React;
  const [scheduledDateTime, setScheduledDateTime] = useState();
  const { selectedUser, allUsers } = data;
  const { useForm } = ReactHookForm;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const handleOnSubmit = (values) => {
    onScheduleSelect(scheduledDateTime);
    // reset();
  };

  const convertDate = (value) => moment(value).format("LLLL");

  const handleChange = (value) => {
    setScheduledDateTime(convertDate(value));
  };

  return (
    <>
      {!schedulePickerOnly && allUsers?.length > 0 && (
        <ChatBoxUserList
          users={allUsers}
          selectedUserId={selectedUser?.id}
          onSelect={onUserSelect}
        />
      )}
      <div className="chat-box-message-area">
        <div className="flex-col w-full">
          <form
            class="flex-col justify-center text-center"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <div className="flex-auto flex-col p-8">
              <Datetime input={false} onChange={handleChange} />
            </div>
            <div className="flex-auto flex-col p-8">
              <p className="f-color-primary f-weight-semiBold">
                {scheduledDateTime ? (
                  <>
                    <span className="f-color-dark">Scheduled Time:</span>{" "}
                    {scheduledDateTime}
                  </>
                ) : (
                  "Please, Select Date and Time"
                )}
              </p>
            </div>
            <div className="flex-none flex-col p-8 justify-center">
              <button
                disabled={!scheduledDateTime}
                className={`${
                  scheduledDateTime
                    ? "bg-primary hover:bg-primary-dark-100 f-color-white"
                    : "bg-light border-light cursor-not-allowed"
                } border-2 px-24 py-8 f-size-16 f-weight-medium capitalize rounded-4`}
              >
                Schedule
              </button>
            </div>
            {successMessage && (
              <div className="flex-auto flex-col p-8">
                <p className="f-color-success f-weight-semiBold">
                  {successMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
