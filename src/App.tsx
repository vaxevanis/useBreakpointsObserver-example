import React, { createContext, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { AppContextProps } from './interface';
import { useBreakpointsObserver } from 'use-breakpoint-observer';
import { BreakSizesType } from 'use-breakpoint-observer/lib/types';

// BreakPoint Sizes
// This Object defines the minimum widths for specific breakpoint names.
const breakPointSizes: BreakSizesType = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

// Optionally: We could pass on Context Provider our logic for what we consider to be mobile screen size
const mobileBreakPoint = breakPointSizes.md ? breakPointSizes.md : 768;
const appContextPropsInit: AppContextProps = {
  isMobile: window.screen.width < mobileBreakPoint,
};

// Create the context Provider and pass the initial values
export const AppContext = createContext<AppContextProps>(appContextPropsInit);

export const App: React.FC<{}> = () => {
  let observeRef = useRef(null);
  // Set as null to observe the document size
  const [breakSize, width] = useBreakpointsObserver(
    observeRef,
    breakPointSizes,
  );

  const isMobile = breakSize
    ? breakSize === 'sm' || breakSize === 'xs'
    : appContextPropsInit.isMobile;

  return (
    <AppContext.Provider
      value={{
        isMobile: isMobile,
      }}
    >
      <div
        className={`App ${breakSize} ${isMobile && 'isMobile'}`}
        ref={observeRef}
      >
        <header className={`App-header`}>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>useBreaksizeObserver Example</h3>
        </header>
        <div className="App-content">
          <p>Resize the window</p>
          <div className="card">
            [{isMobile ? 'Mobile' : 'Desktop'} View]
            <p>
              Breakpoint is: <strong>{breakSize}</strong>
            </p>
            <p>
              Width is: <strong>{width?.toFixed()}px</strong>
            </p>
          </div>
        </div>
        <footer className="App-footer">
          <div>
            <a
              href="https://www.npmjs.com/package/use-breakpoint-observer"
              target="blank"
            >
              Package & Basic Usage
            </a>
          </div>
          <div>
            <a
              href="https://github.com/vaxevanis/useBreakpointsObserver-example"
              target="blank"
            >
              Demo Sourcecode
            </a>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
