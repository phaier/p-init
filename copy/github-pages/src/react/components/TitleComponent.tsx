import * as React from 'react';

export interface TitleComponentProps {
  title: string;
}

export const TitleComponent: React.FC<TitleComponentProps> = (props) => {
  const { title } = props;

  return <div>{title}</div>;
};
