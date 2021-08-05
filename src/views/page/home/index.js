import { useEffect } from 'react';
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
    if (e.type === `move`) {
      console.log(e.direction.toLowerCase());
      socket.emit(e.direction.toLowerCase(), calcMotorPover(255));
    } else {
      console.log(`Stop mooving`);
      socket.emit(`stop`, 0);
    }
  };

  const direction = {
    38: `forward`,
    40: `backward`,
    37: `left`,
    39: `right`,
  }

  const power = 255;

  const stop = () => {
    socket.emit(`stop`, 0);
  }

  const moveHandler = (e) => {
    console.log(e);
    stop();
    socket.emit(direction[e.keyCode], power);
  }

  const stopHandler = (e) => {
    console.log(e)
    stop()
  }

  useEffect(()=>{
    document.addEventListener(`keydown`, moveHandler);
    document.addEventListener(`keyup`, stopHandler);

    () => {
      document.removeEventListener(`keydown`, moveHandler);
      document.removeEventListener(`keyup`, stopHandler);
    }
  }, []);

  return (
    <LayoutBase>
      <div className={s.content}>
        <Joystick size={100} baseColor="lightgray" stickColor="purple" move={onMove} stop={onMove}></Joystick>
      </div>
    </LayoutBase>
  );
}
