import MessageList from "../../components/messages/MessageList";


const Message = () => {
  return (
    <div
      className="
        mx-auto
        flex
        h-[90vh]
        w-full
        flex-col
        overflow-hidden
        sm:h-[90vh]
        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
        <MessageList/>
    </div>
  )
}

export default Message;