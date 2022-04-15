import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login({providers}) {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
        src="/white-logo.png"
        width="190"
        height="170"
        objectFit="contain"
      />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group mt-5"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span className={`${provider.name === 'GitHub' && "loginGitHubButton"} ${provider.name === 'Google' && "loginGoogleButton"} `}></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



