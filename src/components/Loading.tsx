import React from 'react';
import { Bars } from 'react-loader-spinner';

interface LoadingProps {
  text?: string;
  visible?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ text, visible = true }) => {
  return (
    <>
<div className="container_loading">
  <div className="centered">
    <div className="col">
      <Bars
        height={80}
        width={80}
        ariaLabel="bars-loading"
        visible
        color="#000"
      />
    </div>
    <div className="col">
      {text && <p className="loading-text">{text}</p>}
    </div>
  </div>
</div>

    </>

  );
};

export default Loading;

