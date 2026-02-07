<script>
  export let calculators = [];
  export let onOpen = () => {};
</script>

<div class="calculator-sections">
  {#each calculators as section}
    <section class="mod-section">
      <h2 class="section-title">{section.name}</h2>
      <div class="calculator-grid">
        {#each section.calculators as calculator}
          <button
            class="calc-card"
            on:click={() => onOpen(calculator)}
          >
            <div class="calc-icon">{calculator.icon}</div>
            <h3 class="calc-title">{calculator.name}</h3>
            <p class="calc-description">{calculator.description}</p>
          </button>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  .calculator-sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
  }

  .mod-section {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: 0 4px 6px var(--shadow);
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    color: var(--accent);
    text-shadow: 1px 1px 2px var(--shadow);
  }

  .calculator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }

  .calc-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    cursor: pointer;
    transition: var(--transition);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    box-shadow: 0 2px 4px var(--shadow);
  }

  .calc-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 6px 12px var(--shadow);
  }

  .calc-icon {
    font-size: 3rem;
    line-height: 1;
    margin-bottom: var(--spacing-sm);
  }

  .calc-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .calc-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 768px) {
    .calculator-grid {
      grid-template-columns: 1fr;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .mod-section {
      padding: var(--spacing-lg);
    }
  }
</style>
