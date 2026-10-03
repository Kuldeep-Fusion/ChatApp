const formatTime = (date) =>
  date
    ? new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

const MessageBubble = ({
  content,
  type = "text",
  media,
  time,
  isMine,
  isEdited = false,
}) => {
  const mediaUrl = media?.url;
  const isImage = type === "image" && mediaUrl;
  const isVideo = type === "video" && mediaUrl;
  const isFile = type === "file" && mediaUrl;

  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "relative max-w-[82%] px-3 py-2.5",
          "text-[17px] leading-[1.35] tracking-[-0.01em]",
          "shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
          "break-words whitespace-pre-wrap",
          "rounded-[20px]",
          isMine
            ? "rounded-br-[7px] bg-[#b9f22a] text-[#20251a]"
            : "rounded-bl-[7px] bg-white text-[#202020]",
        ].join(" ")}
      >
        {/* IMAGE */}
        {isImage && (
          <a href={mediaUrl} target="_blank" rel="noreferrer">
            <img
              src={mediaUrl}
              alt="sent"
              className="mb-2 max-h-[300px] w-full max-w-[280px] rounded-[12px] object-cover"
            />
          </a>
        )}

        {/* VIDEO */}
        {isVideo && (
          <video
            src={mediaUrl}
            controls
            className="mb-2 max-h-[300px] w-full max-w-[280px] rounded-[12px]"
          />
        )}

        {/* FILE (pdf, doc, etc.) */}
        {isFile && (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="mb-2 flex items-center gap-2 rounded-[12px] bg-black/5 px-3 py-2 text-sm underline"
          >
            📎 Download {content || "file"}
          </a>
        )}

        {/* TEXT (only if content exists) */}
        {content && <p>{content}</p>}

        <div
          className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
            isMine ? "text-[#687d1c]" : "text-[#a0a09a]"
          }`}
        >
          {isEdited && <span>edited</span>}
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;