"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
}

const Pagination = ({page, totalPages, urlParamName}: PaginationProps) => {
  const Router = useRouter();
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    Router.push(newUrl, {scroll: false})
  }
    
  return (
    <div className='flex gap-2'>
      <Button
        size="lg"
        variant="outline"
        className='w-28 rounded-xl border-2 hover:border-primary-400 transition-all font-semibold'
        onClick={() => onClick('previous')}
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>

      <Button
        size="lg"
        variant="outline"
        className='w-28 rounded-xl border-2 hover:border-primary-400 transition-all font-semibold'
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination