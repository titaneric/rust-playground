import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { PlaygroundTheme } from './types';
import State from './state';

import themes from './themes.module.css';
const themeMap = {
  [PlaygroundTheme.Default]: themes.default,
  [PlaygroundTheme.Dark]: themes.dark,
};

const Theme: React.SFC = props => {
  const playgroundTheme = useSelector((state: State) => state.configuration.playgroundTheme);
  const themeClass = themeMap[playgroundTheme];

  useEffect(() => {
    document.body.classList.add(themeClass);
    return () => document.body.classList.remove(themeClass);
  }, [themeClass]);

  return <Fragment>{props.children}</Fragment>;
};

export default Theme;
