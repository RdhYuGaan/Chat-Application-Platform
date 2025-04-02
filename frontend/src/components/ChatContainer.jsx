import React from 'react'
 const ChatContainer = ( props) => {
  return (
    <div className="absolute top-10 left-10 text-2xl font-semibold">
            <div className="card border-2 border-info w-100">
                <div className="row" style={{ height: "95vh" }}>
                    <div className="d-flex flex-col col-12 col-lg-12 col-xl-12">
                        {props.children}
                    </div>
                </div>
            </div> {/* Closing div for the card */}
        </div>
  );
}
export default ChatContainer
