const EnquiryForm = ({ onSubmit }) => {
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
  const handleOnSubmit = ({ data }) => {
    onSubmit(data);
    reset();
  };
  return (
    <>
      <h1 className="f-size-32 f-weight-medium mb-16">Sign Up</h1>
      <form
        class="flex-row flex-wrap -m-8"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="Name*"
            {...register("name", {
              required: "Field shouln't be empty!",
            })}
            className={`bg-light f-size-12 w-full p-12 border-2 rounded-4 ${
              errors.name ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          />
          {errors.name && <ErrorMessage error={errors.name.message} />}
        </div>
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="Email*"
            {...register("email", {
              required: "Field shouln't be empty!",
            })}
            className={`bg-light f-size-12 w-full p-12 border-2 rounded-4 ${
              errors.email ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="Company Name*"
            {...register("companyName", {
              required: "Field shouln't be empty!",
            })}
            className={`bg-light f-size-12 w-full p-12 border-2 rounded-4 ${
              errors.companyName ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          />
          {errors.companyName && (
            <ErrorMessage error={errors.companyName.message} />
          )}
        </div>
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="Contact*"
            name="contact"
            {...register("contact", {
              required: "Field shouln't be empty!",
            })}
            className={`bg-light f-size-12 w-full p-12 border-2 rounded-4 ${
              errors.contact ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          />
          {errors.contact && <ErrorMessage error={errors.contact.message} />}
        </div>
        <div className="col-12 p-8">
          <textarea
            {...register("query", {
              required: "Field shouln't be empty!",
            })}
            placeholder="Type your query..."
            className={`bg-light f-size-12 w-full p-12 border-2 rounded-4 ${
              errors.query ? "border-error" : "border-primary"
            } focus:shadow-lg transition-all`}
          ></textarea>
          {errors.query && <ErrorMessage error={errors.query.message} />}
        </div>
        <div className="col-12 p-8">
          <button className="bg-primary hover:bg-primary-600 f-color-white px-24 py-8 f-size-16 f-weight-medium uppercase rounded-4">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
