<nav>
  <a href="/">Home</a>
  <a href="/auth/sign-in">Sign in</a>
  <a href="/auth/sign-up">Sign up</a>
</nav>

<slot></slot>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #eee;
  }

  nav a {
    text-decoration: none;
    color: #333;
  }

  nav a:hover {
    text-decoration: underline;
  }
</style>
