import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Editor from './Editor';
import Header from './Header';
import Notifications from './Notifications';
import Output from './Output';
import * as selectors from './selectors';
import State from './state';
import { Orientation } from './types';

import styles from './Playground.module.css';
const orientationMap = {
  [Orientation.Horizontal]: styles.splitHorizontal,
  [Orientation.Vertical]: styles.splitVertical,
};

const Playground: React.SFC = () => {
  const showNotifications = useSelector(selectors.anyNotificationsToShowSelector);
  const focus = useSelector((state: State) => state.output.meta.focus);
  const splitOrientation = useSelector(selectors.orientation);


  return (
    <Fragment>
      <div className={styles.container}>
        <div>
          <Header />
        </div>
        <div className={orientationMap[splitOrientation]}>
          <div className={styles.editor}>
            <Editor />
          </div>
          <div className={focus && styles.outputFocused}>
            <Output />
          </div>
        </div>
      </div>
      {showNotifications && <Notifications />}
      <div id="playground-portal" />
    </Fragment>
  );
};

export default Playground;
