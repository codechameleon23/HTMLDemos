// import ErrorMessage from "../Forms/ErrorMessage";

const AddMessageForm = ({ onSubmit }) => {
  const { useForm } = ReactHookForm;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      textMessage: "",
    },
  });
  const handleOnSubmit = ({ textMessage }) => {
    onSubmit(textMessage.replace(/\r?\n/g, "<br />"));
    reset();
  };
  return (
    <div className="add-message">
      <form
        class="flex-row flex-none justify-center"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex-auto flex-col">
          <textarea
            {...register("textMessage", {
              required: "Field shouln't be empty!",
            })}
            placeholder="Start typing..."
            className={`bg-light f-size-12 w-full p-12 border-2 ${
              errors.textMessage ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          ></textarea>
          {errors.textMessage && (
            <ErrorMessage error={errors.textMessage.message} />
          )}
        </div>
        <div className="flex-none flex-col">
          <button className="bg-primary hover:bg-primary-dark-100 f-color-white border-2 border-primary px-8 py-4 f-size-16 f-weight-medium capitalize">
            <span class="material-icons">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// export default AddMessageForm;
