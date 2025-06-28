export default function ForgotPassword() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Reset Password</h2>
      <input type="email" className="border w-full mb-4 p-2" placeholder="Enter your email" />
      <button className="bg-blue-600 text-white px-4 py-2">Send Reset Link</button>
    </div>
  );
}
