import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { IndexPage } from '#/react/containers/IndexPage';

import './index.scss';

createRoot(document.getElementById('application')!).render(
  <React.StrictMode>
    <IndexPage />
  </React.StrictMode>
);
