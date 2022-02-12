const LoginForm = () => {
  const { useForm } = ReactHookForm;
  const { Link } = ReactRouterDOM;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h1 className="f-size-32 f-weight-medium mb-16">Login</h1>
      <form class="flex-row flex-wrap -m-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-8">
          <input
            type="text"
            placeholder="Usename*"
            {...register("username", {
              required: "Field shouln't be empty!",
              validate: (value) =>
                /S+@S+.S+/.test(value) ? "" : "Invalid Email!",
            })}
            class={`bg-light f-size-12 w-full p-12 border-2 ${
              errors.username ? "border-error" : "border-primary"
            } rounded-4 focus:shadow-lg transition-all`}
          />
          {errors.username && <ErrorMessage error={errors.username.message} />}
        </div>
        <div className="col-12 p-8">
          <input
            type="password"
            placeholder="Password*"
            {...register("password", {
              required: "Field shouln't be empty!",
              minLength: 8,
            })}
            class={`bg-light f-size-12 w-full p-12 border-2 ${
              errors.password ? "border-error" : "border-primary"
            } rounded-4 focus:shadow-lg transition-all`}
          />
          {errors.password && <ErrorMessage error={errors.password.message} />}
        </div>
        <div className="col-12 p-8">
          <button className="bg-primary hover:bg-primary-600 f-color-white border-2 border-primary px-24 py-8 f-size-16 f-weight-medium capitalize rounded-4">
            Login
          </button>
        </div>
        <div className="col-12 p-8">
          I'm a 1st time user:
          <Link
            to="/signup"
            className="ml-8 f-color-primary hover:f-color-primary-600 f-size-16 f-weight-medium capitalize rounded-4 d-inline-block no-underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
};
