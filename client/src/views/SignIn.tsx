import { SignIn } from "@clerk/clerk-react"

const SignInComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen my-32">
      <SignIn afterSignInUrl='/dashboard' signUpUrl="/sign-up" />
    </div>
  )
}

export default SignInComponent