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
    if (e.type === `move` && (e.direction === `FORWARD` || e.direction === `BACKWARD`)) {
      console.log(e.direction.toLowerCase(), calcMotorPover(e.y));
      socket.emit(e.direction.toLowerCase(), calcMotorPover(e.y));
    } else {
      console.log(`Stop mooving`);
      socket.emit(`stop`, 0);
    }
  };

  const onTurn = e => {
    if (e.type === `move` && (e.direction === `LEFT` || e.direction === `RIGHT`)) {
      console.log(e.direction.toLowerCase(), calcMotorPover(e.x));
      socket.emit(e.direction.toLowerCase(), Math.abs(e.x));
    } else {
      console.log(`Stop turning`);
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
