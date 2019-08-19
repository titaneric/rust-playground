import React from 'react';

import styles from './Header.module.css';

interface HeaderProps {
  label: string;
}

const Header: React.SFC<HeaderProps> = ({ label }) => (
  <span className={styles.header}>{label}</span>
);

export default Header;
