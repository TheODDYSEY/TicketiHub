"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({event}: {event: IEvent}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
        {hasEventFinished ? (
            <p className='p-2 text-red-400 bg-red-50 rounded-lg px-4 py-3 border border-red-200 font-medium'>
                Sorry, tickets are no longer available.
            </p>
        ) : (
            <>
                <SignedOut>
                    <Button asChild className='button rounded-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold' size="lg">
                        <Link href="/sign-in">
                            Get Tickets
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={userId}/>
                </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton