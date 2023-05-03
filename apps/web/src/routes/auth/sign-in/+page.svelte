<script lang="ts">
  import { page } from '$app/stores';

  export let data;
</script>
<main>
  <div>
    <input type="text">
    <button>Submit</button>
    <pre>{JSON.stringify(data)}</pre>
  </div>
</main>
