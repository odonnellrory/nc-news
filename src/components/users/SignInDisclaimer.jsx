const users = [
  "tickle122",
  "grumpy19",
  "happyamy2016",
  "cooljmessy",
  "weegembump",
  "jessjelly",
];

const SignInDisclaimer = ({ onUsernameClick }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      <p className="font-bold">Welcome!</p>
      <p>This sign-in system is for demonstration purposes only.</p>
      <p>Click on any of the following usernames to sign in:</p>
      <ul className="list-disc list-inside ml-4">
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onUsernameClick(user)}
              className="text-yellow-600 hover:underline focus:outline-none"
            >
              {user}
            </button>
          </li>
        ))}
      </ul>
      <p>The password for all accounts is: "password"</p>
    </div>
  );
};

export default SignInDisclaimer;
