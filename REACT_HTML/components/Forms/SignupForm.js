const SignupForm = () => {
  return (
    <>
      <h1 className="f-size-32 f-weight-medium mb-16">Sign Up</h1>
      <form class="flex-row flex-wrap -m-8">
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="FirstName*"
            name="firstName"
            class="bg-light f-size-14 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-6 p-8">
          <input
            type="text"
            placeholder="LastName*"
            name="lastName"
            class="bg-light f-size-14 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <input
            type="text"
            placeholder="Email*"
            name="email"
            class="bg-light f-size-14 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <input
            type="password"
            placeholder="Password*"
            name="password"
            class="bg-light f-size-14 w-full p-12 border-2 border-primary rounded-4 focus:shadow-lg transition-all"
          />
        </div>
        <div className="col-12 p-8">
          <button className="bg-primary hover:bg-primary-dark f-color-white px-24 py-8 f-size-16 f-weight-medium uppercase rounded-4">
            Sign up
          </button>
        </div>
        <div className="col-12 p-8">
          Already a user:
          <a
            href="./login.html"
            className="ml-8 f-color-primary hover:f-color-primary-dark f-size-16 f-weight-medium capitalize rounded-4 d-inline-block no-underline"
          >
            Login
          </a>
        </div>
      </form>
    </>
  );
};
