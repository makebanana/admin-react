import React from 'react';
import Loadable from 'react-loadable';

const PureLoading = () => <div>Loading...</div>;

export default function DocLoadable(opts) {
  return Loadable({
    loading: PureLoading,
    delay: 200, // Avoiding Flash Of Loading Component
    timeout: 5000, // 5 seconds
    ...opts
  });
}
