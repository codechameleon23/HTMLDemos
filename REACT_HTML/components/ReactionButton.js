const ReactionButton = ({
  emoji,
  type,
  children,
  className,
  style,
  onClick,
}) => {
  const floatingItem = emoji || children;
  const createParticle = (x, y) => {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    if (floatingItem) {
      particle.innerHTML = floatingItem;
      particle.style.fontSize = `${Math.random() * 24 + 10}px`;
      width = height = "auto";

      particle.style.width = `${width}px`;
      particle.style.height = `${height}px`;
      particle.animate(
        [
          {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1,
          },
          {
            transform: `translate(-50%, -50%) translate(${
              x + destinationX
            }px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 1000 + 5000,
          easing: "cubic-bezier(0, .9, .57, 1)",
          delay: delay,
        }
      ).onfinish = (e) => {
        e.target.effect.target.remove();
      };
    }
  };

  const Pop = (elm) => {
    let amount = 30;
    // Quick check if user clicked the button using a keyboard
    if (elm.clientX === 0 && elm.clientY === 0) {
      const bbox = elm.target.getBoundingClientRect();
      const x = bbox.left + bbox.width / 2;
      const y = bbox.top + bbox.height / 2;
      for (let i = 0; i < 30; i++) {
        createParticle(x, y);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        createParticle(elm.clientX, elm.clientY + window.scrollY);
      }
    }
    onClick(type);
  };

  return (
    <button className={className} type={type} style={style} onClick={Pop}>
      {children}
    </button>
  );
};
