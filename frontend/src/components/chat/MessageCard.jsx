import MessageBubble from "./MessageBubble";

const MessageCard = ({ message, friendId }) => {
  const isMine = String(message.sender) !== String(friendId);

  return (
    <MessageBubble
      content={message.content}
      type={message.type}                       
      media={message.media}                    
      time={message.createdAt}
      isMine={isMine}
      isEdited={message.isEdited}
      status={message.status}
    />
  );
};

export default MessageCard;