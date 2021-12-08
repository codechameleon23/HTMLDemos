//  -------------------------------------------
//  All Components
//  -------------------------------------------

const Box = styled.div(({ sx }) => ({ ...sx }));

const SectionDivider = ({ classes }) => {
  return <div className={`mb-40 ${classes}`}></div>;
};

const DiamondShape = ({ classes }) => {
  return (
    <svg
      class={`diamond-shape h-full ${classes}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 184 184"
    >
      <path
        fill="currentColor"
        d="M-.063 91.993 91.93 0l91.994 91.993-91.994 91.994z"
      />
    </svg>
  );
};

const AspectRatioBox = ({ ratio, children, sx, classes }) => {
  const asRatio = ratio || [1, 1];
  return (
    <Box
      sx={{
        "&:before": {
          paddingTop: `calc((${asRatio[1] / asRatio[0]})*100%)`,
        },
        ...sx,
      }}
      className={`ratio pos-relative ${classes}`}
    >
      {children}
    </Box>
  );
};

const HeadingBanner = ({
  theme,
  children,
  classes,
  containerClasses,
  bgComponent,
}) => {
  return (
    <section
      className={`heading-banner flex-col justify-center ${theme} ${classes}`}
    >
      {bgComponent}
      <div
        className={`container sm:container-sm md:container-md lg:container-lg xl:container-xl xxl:container-xxl mx-auto ${containerClasses}`}
      >
        {children}
      </div>
    </section>
  );
};

const HeadingBar = ({ theme, children, classes, containerClasses }) => {
  return (
    <section className={`heading-bar py-20 ${theme} ${classes}`}>
      <div
        className={`container ${
          containerClasses ||
          "sm:container-sm md:container-md lg:container-lg xl:container-xl xxl:container-xxl"
        } mx-auto`}
      >
        {children}
      </div>
    </section>
  );
};

const ArticleCard = ({ theme, image, children, classes, isReversed }) => {
  return (
    <section className={`article-card ${theme} ${classes}`}>
      <div class="container sm:container-sm md:container-md lg:container-lg xl:container-xl mx-auto">
        <article
          className={`flex-row ${
            isReversed ? "flex-row-reverse" : ""
          } flex-wrap align-center`}
        >
          <div
            className={`col-12 lg:col-6 ${
              isReversed
                ? "pin-r pin-l-auto lg:pl-10"
                : "pin-l pin-r-auto lg:pr-10"
            }`}
          >
            <div class="ratio ratio-9x7 lg:ratio-1x1 pos-relative w-full h-full">
              <img
                className="pos-absolute pin object-cover h-full w-full"
                src={image}
              />
            </div>
          </div>
          <div
            className={`col-12 lg:col-6 ${
              isReversed ? "lg:pr-54 lg:mr-auto" : "lg:pl-54 lg:ml-auto"
            } pt-20 lg:pb-20`}
          >
            {children}
          </div>
        </article>
      </div>
    </section>
  );
};

const ArticleFullCard = ({
  theme,
  image,
  imageChildren,
  children,
  classes,
  isReversed,
}) => {
  return (
    <section className={`article-full-card ${theme} pos-relative ${classes}`}>
      <div
        className={`col-12 lg:col-6 lg:pos-absolute pin-y ${
          isReversed ? "pin-r pin-l-auto" : "pin-l pin-r-auto"
        }`}
      >
        {imageChildren || (
          <div class="ratio ratio-1x1 md:ratio-16x9 lg:ratio-none pos-relative w-full h-full">
            <img
              className="pos-absolute pin object-cover h-full w-full"
              src={image}
            />
          </div>
        )}
      </div>
      <div class="container sm:container-sm md:container-md lg:container-lg xl:container-xl mx-auto">
        <article
          className={`col-12 lg:col-6 ${
            isReversed ? "lg:pr-54 lg:mr-auto" : "lg:pl-54 lg:ml-auto"
          } py-40 lg:py-80`}
        >
          {children}
        </article>
      </div>
    </section>
  );
};

const TestimonialsCard = ({ theme, image, children, classes, isReversed }) => {
  return (
    <article
      className={`testimonials-card ${theme} flex-row flex-wrap align-center pos-relative ${classes}`}
    >
      {image ? (
        <div
          className={`col-12 lg:col-6 lg:pos-absolute pin-y ${
            isReversed ? "pin-l pin-r-auto" : "pin-r pin-l-auto"
          }`}
        >
          <div class="ratio ratio-16x9 pos-relative w-full h-full">
            <img
              className="pos-absolute pin object-cover h-full w-full"
              src={image}
            />
          </div>
        </div>
      ) : null}
      <div class="container sm:container-sm md:container-md lg:container-lg xl:container-xl mx-auto">
        <div
          className={`col-12 ${image ? "lg:col-6" : ""} ${
            image ? (isReversed ? "lg:pl-80 lg:ml-auto" : "lg:pr-80") : ""
          } py-40 lg:py-80`}
        >
          {children}
        </div>
      </div>
    </article>
  );
};

const MediaCard = ({
  theme,
  image,
  imageRatio,
  link,
  imageClass,
  children,
  rollOver,
  classes,
}) => {
  return (
    <a
      href={link || "#"}
      className={`media-card ${theme} flex-col ${classes} hover:bg-white flex-stretch flex-col transition-all no-underline hover:shadow-lg`}
    >
      <figure
        className={`ratio ${imageRatio} image-placeholder pos-relative bg-light flex-none oveflow-hidden ${imageClass}`}
      >
        <div
          class="rollover-effect pos-absolute pin bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        {rollOver}
      </figure>
      {children ? (
        <section className={`card-body pt-20 flex-auto flex-col`}>
          {children}
        </section>
      ) : null}
    </a>
  );
};

const Pagination = ({ theme }) => {
  return (
    <div
      class={`pagination ${theme} flex-row flex-wrap justify-center mx-auto f-family-secondary`}
    >
      <a href="#" class="active f-color-red hover:f-color-red px-15">
        <span>1</span>
      </a>
      <a href="#" class="hover:f-color-red px-15">
        <span>2</span>
      </a>
      <a href="#" class="hover:f-color-red px-15">
        <span>3</span>
      </a>
      <a href="#" class="hover:f-color-red px-15">
        <span>4</span>
      </a>
      <a href="#" class="hover:f-color-red px-15">
        <span>5</span>
      </a>
    </div>
  );
};
