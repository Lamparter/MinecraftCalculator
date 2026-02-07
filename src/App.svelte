<script>
  import CalculatorGrid from './components/CalculatorGrid.svelte';
  import Modal from './components/Modal.svelte';
  import { calculators } from './data/calculators.js';

  let activeCalculator = null;

  function openCalculator(calculator) {
    activeCalculator = calculator;
  }

  function closeCalculator() {
    activeCalculator = null;
  }
</script>

<div class="app">
  <header class="header">
    <div class="container">
      <h1 class="title">⛏️ Minecraft Mod Calculators</h1>
      <p class="subtitle">Professional calculators for complex Minecraft mods</p>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <CalculatorGrid {calculators} onOpen={openCalculator} />
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p>Made with ❤️ for the Minecraft modding community</p>
    </div>
  </footer>

  {#if activeCalculator}
    <Modal calculator={activeCalculator} onClose={closeCalculator} />
  {/if}
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    width: 100%;
  }

  .header {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
    border-bottom: 3px solid var(--border-color);
    padding: var(--spacing-2xl) 0;
    box-shadow: 0 4px 6px var(--shadow);
  }

  .title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: var(--spacing-sm);
    text-shadow: 2px 2px 4px var(--shadow);
  }

  .subtitle {
    font-size: 1.25rem;
    text-align: center;
    color: var(--text-secondary);
  }

  .main {
    flex: 1;
    padding: var(--spacing-2xl) 0;
  }

  .footer {
    background: var(--bg-secondary);
    border-top: 3px solid var(--border-color);
    padding: var(--spacing-xl) 0;
    text-align: center;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .header {
      padding: var(--spacing-xl) 0;
    }
  }
</style>
