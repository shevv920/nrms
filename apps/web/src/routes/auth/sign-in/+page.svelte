<script lang="ts">
  let loginValue = '';
  let passwordValue = '';

  const handleSubmit = () => {
    console.log(loginValue, passwordValue);
  };

</script>
<main>
  <div>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="login">Login</label>
      <input autocomplete="off" id="login" type="text" bind:value={loginValue}>
      <label for="password">Password</label>
      <input autocomplete="off" id="password" type="password" bind:value={passwordValue}>
      <button type="submit">Submit</button>
    </form>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    gap: 10px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  input:focus {
    border-color: #000;
  }

  button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #ccc;
  }
</style>
