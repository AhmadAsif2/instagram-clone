import Header from '@/components/Header';
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import icons from the react-icons library

function signIn({ providers }) {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 px-14 text-center">
        <img src="https://links.papareact.com/ocw" alt="" className="w-80" />
        <p className="font-xs italic">
          This is not a <b>REAL</b> app, it is built for educational purposes
          only
        </p>
        <div className="mt-32">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="mb-4">
              <button
                className="flex items-center p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: '/' })
                }
              >
                {provider.id === 'google' && <FaGoogle className="mr-2" />}
                {provider.id === 'github' && <FaGithub className="mr-2" />}
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default signIn;
