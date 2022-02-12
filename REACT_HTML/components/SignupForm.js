const SignupForm = () => {
  const { Link } = ReactRouterDOM;
  return (
    <>
      <h1 className="f-size-32 f-weight-medium mb-16">Sign Up</h1>
      <form class="flex-row flex-wrap -m-8">
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="FirstName*"
            name="firstName"
            class="bg-light f-size-12 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="LastName*"
            name="lastName"
            class="bg-light f-size-12 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <input
            type="text"
            placeholder="Email*"
            name="email"
            class="bg-light f-size-12 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <input
            type="password"
            placeholder="Password*"
            name="password"
            class="bg-light f-size-12 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <button className="bg-primary hover:bg-primary-600 f-color-white px-24 py-8 f-size-16 f-weight-medium uppercase rounded-4">
            Sign up
          </button>
        </div>
        <div className="col-12 p-8">
          Already a user:
          <Link
            to="/login"
            className="ml-8 f-color-primary hover:f-color-primary-600 f-size-16 f-weight-medium capitalize rounded-4 d-inline-block no-underline"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
};
