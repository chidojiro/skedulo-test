import { Children } from '@/common/types';
import React from 'react';

export class ErrorBoundary extends React.Component<Children> {
  constructor(props: Children) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    alert('Something went wrong!');
  }

  render() {
    return this.props.children;
  }
}
