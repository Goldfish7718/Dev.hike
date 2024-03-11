import { SignUp } from "@clerk/clerk-react"

const SignUpComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen my-32">
      <SignUp afterSignInUrl='/dashboard' signInUrl="/sign-in" />
    </div>
  )
}

export default SignUpComponent