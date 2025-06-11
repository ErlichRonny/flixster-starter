import { createElement } from "react";
import { createPortal } from "react-dom";

export default function MovieModal() {
  return createPortal(
    <div className="movieModal">
      <button onClick={onClose}> 𝘅 </button>
    </div>,
    document.body
  );
}
