import MessageBubble from "./MessageBubble";

const MessageCard = ({
  message,
  friendId,
  onEdit,
  onDelete,
}) => {
  const isMine =
    String(message.sender) !== String(friendId);

  return (
    <MessageBubble
      id={message._id}
      content={message.content}
      type={message.type}
      media={message.media}
      time={message.createdAt}
      isMine={isMine}
      isEdited={message.isEdited}
      status={message.status}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default MessageCard;