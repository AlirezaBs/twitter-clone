import { ReactNode, useEffect } from 'react';

interface Props {
    children : ReactNode
}

function AppLayout({ children } : Props ) {
    useEffect(() => {
        // Add 'no-hover' class to body tag for touch devices
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
          document.body.classList.add('no-hover');
        }
      }, []);

      return <div className="layout">{children}</div>;
}

export default AppLayout