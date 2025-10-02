import { usePage } from '@inertiajs/react';
import React from 'react'

const Can = ({permission,children}) => {
  const auth = usePage().props.auth;
  return auth.can[permission] ? children : null;
}

export default Can