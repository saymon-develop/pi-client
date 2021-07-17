import { io } from 'socket.io-client';
import { Joystick } from 'react-joystick-component';

import LayoutBase from 'partial/layout/base';

import s from 'styles/Home.module.css';

export default function Home() {
  const socket = io(`ws://localhost:3080`, {
    transport: [`websocket`],
    extraHeaders: {
      'Access-Control-Allow-Origin': `*`
    }
  });

  socket.on(`bootstrap`, arg => console.log(arg));

  const calcMotorPover = joystickPover => {
    return joystickPover === 0 ? 0 : Math.abs(joystickPover) * 5 + 5;
  };

  const onMove = e => {
    console.log(`onMove`, e);
    if (e.type === `move`) {
      socket.emit(e.y > 0 ? `forward` : `backward`, calcMotorPover(e.y));
    } else {
      socket.emit(`stop`, 0);
    }
  };

  const onTurn = e => {
    console.log(`onTurn`, e);
    if (e.type === `move`) {
      socket.emit(e.x > 0 ? `right` : `left`, Math.abs(e.x));
    } else {
      socket.emit(`turn-stop`, 0);
    }
  };

  return (
    <LayoutBase>
      <div className={s.content}>
        <Joystick size={100} baseColor="lightgray" stickColor="purple" move={onMove} stop={onMove}></Joystick>
        <Joystick size={100} baseColor="lightgray" stickColor="purple" move={onTurn} stop={onTurn}></Joystick>
      </div>
    </LayoutBase>
  );
}
