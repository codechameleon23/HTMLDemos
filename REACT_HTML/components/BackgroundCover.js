const BackgroundCover = ({ image, children }) => {
  return (
    <section className="ratio-screen">
      <div
        className="pos-absolute pin bg-contain bg-no-repeat"
        style={{
          backgroundImage: `URL("${image}")`,
        }}
      >
        {children}
      </div>
    </section>
  );
};
