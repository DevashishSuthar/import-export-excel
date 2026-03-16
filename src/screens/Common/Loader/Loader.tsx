import React from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import type { RootState } from '@/store/Store';

type Props = {
  children?: React.ReactNode;
};

const Loader = ({ children }: Props) => {
  const isLoading = useSelector((state: RootState) => state.loaderData.isLoading);

  return (
    <>
      {children}

      {isLoading && (
        <div style={overlayStyle}>
          <BeatLoader size={30} margin={2} color="#9d48be" />
        </div>
      )}
    </>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1400
};

export default Loader;