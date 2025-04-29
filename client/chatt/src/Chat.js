import React,{useState,useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({socket,username,room}) {
    const [currentmessage,setCurrentmessage]=useState("");
    const [messagelist,setMessagelist]=useState([]);

    const sendMessage= async ()=>{
        if (currentmessage !==""){
            const messageData={
                room:room,
                author:username,
                message:currentmessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message",messageData);
            setMessagelist((list)=>[...list,messageData]);
            setCurrentmessage("");
        }
    }

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
        setMessagelist((list) => [...list, data]);
        });
      }, [socket]);
    return (
        <div className="chat-window">
            <div className="chat-header"><p>Live Chat:{room}</p></div>
            <div className="chat-body">
                <div className='container'>
                    <div className='left eyes'></div>
                    <div className='right eyes'></div>
                </div>
                <script src='script.js'></script>
                <ScrollToBottom className='message-container'>
                {messagelist.map((messagecontent)=>{
                    return (
                        <>
                    <div className='message' id={username===messagecontent.author?"you":"other"}>
                        <div>
                            <div className='message-content'>
                                <p>{messagecontent.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p id='time'>{messagecontent.time}</p>
                                <p id='author'>{messagecontent.author}</p>
                            </div>
                        </div>
                    </div></>);
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={currentmessage}
                    placeholder="type something..."
                    onChange={(event)=>{
                        setCurrentmessage(event.target.value)
                    }}
                    onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;