import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    if (!isHovering) return;

    const rect = currentTarget.getBoundingClientRect();
    const xOffset = (clientX - (rect.left + rect.width / 2)) / 10;
    const yOffset = (clientY - (rect.top + rect.height / 2)) / 10;

    gsap.to(contentRef.current, {
      rotationY: xOffset,
      rotationX: -yOffset,
      x: xOffset * 2,
      y: yOffset * 2,
      z: 30,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    gsap.to(contentRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    gsap.to(contentRef.current, {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute z-50  size-full overflow-hidden rounded-lg"
    >
      <div ref={contentRef} className="size-full  origin-center rounded-lg">
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;

