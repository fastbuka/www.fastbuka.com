import Image from "next/image";
export default function Register() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg flex items-center">
          {/* Left Side (Form) */}
          <div className="w-1/2">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Create an Account</h2>
            <p className="text-gray-600 mb-8">Sign up to start ordering from FastBuka</p>
  
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Name"
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="example@email.com"
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Create a password"
                />
              </div>
  
              <Button className="w-full bg-green-600 text-white py-3 rounded-lg">Create Account</Button>
            </form>
  
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 font-semibold">
                Login
              </a>
            </p>
          </div>
  
          {/* Right Side (Image) */}
          <div className="w-1/2 hidden md:block">
            <Image
              src="/images/register_illustration.png"
              alt="FastBuka"
              className="rounded-lg w-full"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    );
  }
  