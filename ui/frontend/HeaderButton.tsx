import React from 'react';

import { ExpandableIcon } from './Icon';

import styles from './HeaderButton.module.css';

interface HeaderButtonProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isExpandable?: boolean;
  isBuild?: boolean;
}

const HeaderButton: React.SFC<HeaderButtonProps> = ({ icon, rightIcon, isExpandable, isBuild, children }) => {
  const c = [styles.container];

  if (icon) { c.push(styles.hasLeftIcon); }
  if (rightIcon) { c.push(styles.hasRightIcon); }
  if (isExpandable) { c.push(styles.isExpandable); }
  if ((icon || rightIcon) && !isExpandable && !children) { c.push(styles.isIconOnly); }
  if (isBuild) { c.push(styles.isBuild); }

  return (
    <div className={c.join(' ')}>
      {icon && <div className={styles.leftIcon}>{icon}</div>}
      {children}
      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      {isExpandable && <div className={styles.drop}><ExpandableIcon /></div>}
    </div>
  );
};

export default HeaderButton;
