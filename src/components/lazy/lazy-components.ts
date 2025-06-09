import React from 'react';

export const LazyPhoneInput = React.lazy(() =>
  import('@/components/phone-input').then((module) => ({
    default: module.PhoneInput
  }))
);

export const LazyMultipleSelector = React.lazy(
  () => import('@/components/multiple-selector')
);

export const LazyInput = React.lazy(() =>
  import('@/components/ui/input').then((module) => ({
    default: module.Input
  }))
);
