import { useState } from 'react';
import { Client } from '@stomp/stompjs';

function App() {
  const [connected, setConnected] = useState(false);
  const [greetings, setGreetings] = useState<any[]>([]);

  const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/chat',
    onConnect: frame => {
      setConnected(true);
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/greetings', greeting => {
        console.log('Received: ' + greeting.body);
        setGreetings(prevState => [
          ...prevState,
          JSON.parse(greeting.body).content
        ]);
      });
    },
    onWebSocketError: error => {
      console.error('Error with websocket', error);
    },
    onStompError: frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    }
  });

  function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log('Disconnected');
  }

  function sendName() {
    stompClient.publish({
      destination: '/app/hello',
      body: JSON.stringify({'message': 'olaf'})
    });
  }

  return (
    <>
      <div id="main-content" className="container">
        <div className="row">
          <button onClick={() => stompClient.activate()}>Connect</button>
          <button onClick={() => disconnect()}>Disconnect</button>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Your name here..."
          />
          <button onClick={() => sendName()}>Send</button>
        </div>
        <table id="conversation" className="table table-striped">
          <thead>
            <tr>
              <th>Greetings</th>
            </tr>
          </thead>
          <tbody id="greetings">
            {greetings.map((greeting, index) => (
              <tr key={index}>
                <td>{greeting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
