import React, { useContext } from "react";
import { getGradient } from "../../../../themes/theme";
import { ThemeContext } from "../../../../themes/ThemeProvider";

/**
 * React components for SME
 * - CommPanel: fixed vertical buttons (Emergency, Call, WhatsApp)
 * - BrandCarousel: smooth, pausable marquee for partner logos/names
 *
 * Tailwind-first. Inline <style> injects keyframes used for the carousel.
 */

export function CommPanel({
  phone = "+919952638166",
  whatsapp = "9952638166",
  onEmergency = () => {},
  className = "",
  show = true,
}) {
  if (!show) return null;

  const tel = `tel:${phone.replace(/\s|-/g, "")}`;
  const wa = `https://wa.me/${whatsapp.replace(
    /\D/g,
    ""
  )}?text=Hello%20Team%20%F0%9F%91%8B%0AI%20want%20your%20service%20please%20assist.`;
  const theme = useContext(ThemeContext);
  return (
    <div
      className={[
        "fixed right-5 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-4",
        className,
      ].join(" ")}
      aria-label="Communication panel"
    >
      {/* Emergency
      <button
        type="button"
        onClick={onEmergency}
        title="24/7 Emergency"
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 bg-red-600"
        aria-label="Emergency"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
          <path d="M12 2 1 21h22L12 2zm0 4.46L19.53 19H4.47L12 6.46z"></path>
        </svg>
      </button> */}
      {/* Call */}
      <a
        href={tel}
        title="Call Us"
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
        style={{                  background: getGradient(theme),
}}
        aria-label="Call"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
        </svg>
      </a>
      {/* WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-3xl shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 bg-[#25D366]"
        aria-label="WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19.11 17.38c-.27-.13-1.58-.78-1.83-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.35-.8-.71-1.35-1.58-1.51-1.85-.16-.27-.02-.41.11-.54.11-.11.27-.29.4-.43.13-.14.18-.23.27-.39.09-.16.05-.3-.02-.43-.07-.13-.61-1.47-.83-2.02-.22-.53-.44-.46-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.35-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.13.18 1.94 2.96 4.72 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31z" />
          <path d="M26.66 5.34A12.65 12.65 0 0016 .06C7.3.06.17 7.19.17 15.86c0 2.81.77 5.44 2.1 7.71L.03 32l8.61-2.25a15.8 15.8 0 007.36 1.87h.01c8.66 0 15.69-7.03 15.69-15.7 0-4.19-1.63-8.13-4.75-10.58zm-10 24.54h-.01a13.18 13.18 0 01-6.71-1.85l-.48-.29-5.11 1.34 1.36-4.99-.32-.51a13.1 13.1 0 01-1.99-6.99c0-7.26 5.91-13.17 13.18-13.17 3.52 0 6.83 1.37 9.32 3.86a13.07 13.07 0 014 9.32c0 7.26-5.91 13.17-13.23 13.17z" />
        </svg>
      </a>
    </div>
  );
}

export function BrandCarousel({ items = [], className = "" }) {
  // Duplicate items to achieve seamless loop
  const list = [...items, ...items];

  return (
    <div className={["overflow-hidden relative", className].join(" ")}>
      {/* Inline keyframes for portability */}
      <style>{`
        @keyframes sme-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div
        className="flex"
        style={{ animation: "sme-scroll 30s linear infinite" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }
      >
        {list.map((label, idx) => (
          <div
            key={`${label}-${idx}`}
            className="min-w-[120px] h-[60px] mx-5 my-4 flex items-center justify-center bg-white rounded-lg shadow-md font-semibold text-gray-700"
          >
            {typeof label === "string" ? label : label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommPanel;
