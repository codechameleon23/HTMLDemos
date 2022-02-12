const Modal = ({ title, cover, children, onClose, style, className }) => {
  return (
    <>
      {cover && (
        <div
          onClick={onClose}
          className="pos-absolute pin bg-dark opacity-25"
        ></div>
      )}
      <div
        style={{
          opacity: "1",
          visibility: "visible",
          position: "fixed",
          overflow: "hidden",
          zIndex: "100001",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          className={`modal-wrapper ${className}`}
          style={{
            
            ...style,
          }}
        >
          <div className="flex-col w-full flex-stretch">
            <header className="p-8 bg-primary f-color-white f-weight-medium flex-none flex-row rounded-t-8">
              {title && <h3>{title}</h3>}
              <button
                onClick={onClose}
                className="cursor-pointer f-color-inherit ratio-1x1 icon-24 f-size-12 ml-auto"
              >
                <span className="pos-absolute pin">
                  <span class="material-icons">close</span>
                </span>
              </button>
            </header>
            {children}
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            height: "100%",
          }}
        ></div>
      </div>
    </>
  );
};
