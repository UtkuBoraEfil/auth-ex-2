"use client";
import React from 'react';
import {signIn, useSession} from 'next-auth/react';
import { SignIn } from "@/components/sign-in";
import SignOut from '@/components/signout-button';
import {SignInGoogle} from '@/components/sign-in-google';
import {SignInCredentials} from '@/components/sign-in-credentials';

export default  function Dashboard(){
    const {data: session} =  useSession();
    return (
        <>
            { session ? (
                <>
                    <h1>Dashboard</h1>
                    <p>Welcome {session?.user?.email}</p>
                    <p>{session?.expires}</p>
                    <SignOut/>
                </>
            ):
            (
                <>
                    <SignInGoogle/>
                    <SignIn/>
                    <SignInCredentials/>

                </>
            )
            }
        </>
    )
}