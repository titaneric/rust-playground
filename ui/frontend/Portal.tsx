import React, { useEffect, useState } from 'react';
import { Portal as ReactPortal } from 'react-portal';

const Portal: React.SFC = props => {
  const [portalNode, setPortalNode] = useState<HTMLElement>(null);

  useEffect(() => {
    setPortalNode(document.getElementById('playground-portal'));
  }, []);

  return (
    portalNode && (
      <ReactPortal node={portalNode}>
        {props.children}
      </ReactPortal>
    )
  );
};

export default Portal;
