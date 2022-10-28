import { Fragment } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function MobileKeyboard(props: { isMobile: boolean, isGameOver: boolean, onKeyPress: any }) {
  return (
    <Fragment>
      {props.isMobile && !props.isGameOver && (<>
        <Keyboard
          onKeyPress={props.onKeyPress}
          layout={{
            default: [
              "q w e r t y u i o p {bksp}",
              "a s d f g h j k l {enter}",
              "z x c v b n m {delete}",
            ],
          }}
        />
        <div style={{ paddingTop: '260px' }} />
      </>)}
    </Fragment>
  )
}
