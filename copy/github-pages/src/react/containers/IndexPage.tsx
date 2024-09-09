import * as React from 'react';

import { TitleComponent } from '#/react/components/TitleComponent';

export interface IndexPageProps {}

export const IndexPage: React.FC<IndexPageProps> = () => {
  console.log('IndexPage');

  return <TitleComponent title="IndexPage" />;
};
