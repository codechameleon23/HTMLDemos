const VideoFrame = ({ url, style, ...rest }) => {
  return (
    <div
      className="ratio-16x9 pos-absolute bg-dark border-4 border-dark rounded-8 overflow-hidden"
      style={{
        left: "50%",
        width: "50%",
        transform: "translate(-50%, -50%)",
        top: "50%",
        ...style,
      }}
    >
      <iframe
        className="pos-absolute pin w-full h-full"
        {...rest}
        src={url}
      ></iframe>
    </div>
  );
};
