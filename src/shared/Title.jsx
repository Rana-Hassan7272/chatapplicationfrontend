import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Title({ title = "ChatApp", description = "I MADE THIS APP MYSELF" }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
