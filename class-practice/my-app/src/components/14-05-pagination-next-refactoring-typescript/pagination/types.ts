'use client';

import { Dispatch, SetStateAction } from 'react';

export interface IPropsPagination {
  keyList: [string];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limit: number;
}
