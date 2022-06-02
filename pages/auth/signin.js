/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Signin = ({ csrfToken }) => {
  const [email, setEmail] = useState("");
  const { error } = useRouter().query;

  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  const errorMessage = error && (errors[error] ?? errors.default);
  toast.error(errorMessage, {
    toastId: `${error}`,
  });

  return (
    <React.Fragment>
      <Head>
        <title>Provider | Signin</title>
        <link rel='icon' href='/logo.jpeg' />
      </Head>

      <React.Fragment>
        <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='h-20 w-40 mx-auto'>
              <img
                className='object-cover h-full w-full rounded-sm'
                src='/logo.jpeg'
                alt='Workflow'
              />
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white pb-4 px-4 border border-gray-50 shadow-md sm:rounded-lg sm:px-10'>
              <div className='mt-6'>
                <div className='flex flex-col'>
                  <div className='my-2'>
                    <button
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: process.env.CALLBACK_URL,
                        })
                      }
                      className='w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign in with Google</span>
                      <FcGoogle size={28} />
                    </button>
                  </div>

                  <div className='my-2'>
                    <button
                      onClick={() =>
                        signIn("github", {
                          callbackUrl: process.env.CALLBACK_URL,
                        })
                      }
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-900'
                    >
                      <span className='sr-only'>Sign in with GitHub</span>
                      <BsGithub size={22} color={"white"} />
                    </button>
                  </div>

                  <div className='my-2'>
                    <button
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: process.env.CALLBACK_URL,
                        })
                      }
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-gray-500 hover:bg-blue-700'
                    >
                      <span className='sr-only'>Sign in with Facebook</span>
                      <BsFacebook size={22} color='white' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const csrfToken = await getCsrfToken(context);
  if (session) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      csrfToken,
    },
  };
};

export default Signin;
