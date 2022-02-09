const Modal = ({ title, cover, children, onClose, sxClasses }) => {
  return (
    <>
      {cover && (
        <div
          onClick={onClose}
          className="pos-absolute pin bg-dark opacity-25"
        ></div>
      )}
      <div
        className={`container container-md rounded-8 pos-absolute pin-tl-50 pin-tl50 z-10 bg-white flex-col m-auto pointer-events-all shadow-lg ${sxClasses}`}
      >
        <header className="p-8 bg-primary f-color-white f-weight-medium flex-row rounded-t-8">
          {title && <h3>{title}</h3>}
          <div
            onClick={onClose}
            className="ratio-1x1 icon-24 f-size-12 ml-auto"
          >
            <span className="pos-absolute pin">
              <span class="material-icons">close</span>
            </span>
          </div>
        </header>
        <div className="flex-auto p-8">{children}</div>
      </div>
    </>
  );
};
