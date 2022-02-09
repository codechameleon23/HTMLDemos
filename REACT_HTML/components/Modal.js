const Modal = ({ title, cover, children, onClose, style }) => {
  return (
    <>
      {cover && (
        <div
          onClick={onClose}
          className="pos-absolute pin bg-dark opacity-25"
        ></div>
      )}
      <div
        style={{ ...style }}
        className="modal container container-md flex-col rounded-8 bg-white pointer-events-all shadow-lg pos-fixed z-20"
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
        <div className="flex-auto flex-col p-8 overflow-auto">{children}</div>
      </div>
    </>
  );
};
