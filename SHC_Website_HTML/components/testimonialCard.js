const TestimonialCard = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        const { quote, author } = item;
        const stringLength = 240;
        const isLong = quote?.length > stringLength;
        const trimmedString = isLong
          ? quote.substr(0, stringLength - 1) + "..."
          : quote;
        return (
          <div
            key={`testimonial-${index}`}
            class="col-12 md:col-6 lg:col-4 p-sm-200 flex-col"
          >
            <a
              href="#"
              class="flex-stretch flex-col no-underline bg-white p-2md-100 flex-auto hover:shadow-lg transition-all"
            >
              <div class="text-wrap text-center f-height-ease">
                <p>{trimmedString}</p>
                {!isLong ? <p class="f-weight-semiBold">{author}</p> : null}
                {isLong ? (
                  <span class="button f-size-2sm-200 f-weight-semiBold f-color-primary hover:f-color-secondary border-b-6 border-primary">
                    Read more
                  </span>
                ) : null}
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};
