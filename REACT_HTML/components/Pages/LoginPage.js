const LoginPage = () => {
  return (
    <main className="flex-auto flex-col with-navigation">
      <section className="ratio-screen">
        <div
          className="pos-absolute pin bg-contain bg-no-repeat"
          style={{
            backgroundImage: 'URL("./images/login.jpg")',
          }}
        ></div>
        <section className="md:pos-absolute pin flex-col justify-center py-64">
          <div className="container container-xl mx-auto">
            <div className="col-12 md:col-5 ml-auto">
              <LoginForm />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
