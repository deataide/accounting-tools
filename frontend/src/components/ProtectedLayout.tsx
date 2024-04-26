import useAuth from '@/hooks/useAuth'
import { ReactNode } from 'react';

interface LayoutProps {
    children:ReactNode
  }

export default function ProtectedLayout({children}: LayoutProps) {

    const auth = useAuth()

    if(!auth.hasAuthenticatedUser){
        return <h1 className='flex align-middle justify-center'>You don't have acess</h1>
    }

  return children
  
}
