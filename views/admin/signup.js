const layout = require("../layout");
module.exports = () => {
  return layout({
    content: `  
        <div>
            Your id is:
            <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
            </form>
        </div>
  `,
  });
};
