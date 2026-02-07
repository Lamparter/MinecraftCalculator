<script>
  let parallelCrafts = 5;
  let coProcessors = 0;

  $: maxParallel = 1 + coProcessors;
  $: craftingSpeed = maxParallel;
  $: recommended = Math.max(0, parallelCrafts - 1);
  $: isOptimal = coProcessors >= recommended;
</script>

<div class="calculator">
  <div class="calc-section">
    <h3>Crafting Configuration</h3>

    <div class="input-group">
      <label for="parallelCrafts">Desired Parallel Crafts</label>
      <input
        id="parallelCrafts"
        type="number"
        bind:value={parallelCrafts}
        min="1"
        max="100"
        step="1"
      />
      <span class="input-hint">Simultaneous crafting jobs</span>
    </div>

    <div class="input-group">
      <label for="coProcessors">Crafting Co-Processors</label>
      <input
        id="coProcessors"
        type="number"
        bind:value={coProcessors}
        min="0"
        max="100"
        step="1"
      />
    </div>
  </div>

  <div class="calc-section results">
    <h3>Results</h3>

    <div class="result-grid">
      <div class="result-item" class:highlight={isOptimal} class:warning={!isOptimal}>
        <div class="result-label">Current Parallel Capacity</div>
        <div class="result-value">{maxParallel}</div>
        <div class="result-subtext">
          {#if isOptimal}
            ✅ Optimal configuration
          {:else}
            ⚠️ Need {recommended - coProcessors} more
          {/if}
        </div>
      </div>

      <div class="result-item">
        <div class="result-label">Recommended Co-Processors</div>
        <div class="result-value">{recommended}</div>
      </div>

      <div class="result-item">
        <div class="result-label">Crafting Speed</div>
        <div class="result-value">{craftingSpeed}x</div>
        <div class="result-subtext">relative to base</div>
      </div>
    </div>
  </div>

  <div class="calc-section info">
    <h3>💡 Crafting Tips</h3>
    <ul>
      <li><strong>Base Capacity:</strong> 1 craft without co-processors</li>
      <li><strong>Co-Processors:</strong> +1 parallel craft per co-processor</li>
      <li><strong>Max Slots:</strong> Each CPU can have 1 storage + 6 co-processors</li>
      <li><strong>Multiple CPUs:</strong> Build several crafting units for more parallelism</li>
      <li><strong>Complex Crafts:</strong> Multi-step recipes benefit most from parallelism</li>
    </ul>

    <h3 class="mt-2">🔧 Crafting CPU Components</h3>
    <ul>
      <li><strong>Crafting Storage:</strong> Holds items during crafting (1-64k)</li>
      <li><strong>Co-Processors:</strong> Enable parallel crafting (up to 6 per CPU)</li>
      <li><strong>Crafting Monitor:</strong> Shows current crafting progress</li>
    </ul>
  </div>
</div>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .calc-section {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
  }

  .calc-section h3 {
    margin: 0 0 var(--spacing-lg) 0;
    color: var(--accent);
    font-size: 1.25rem;
  }

  h3.mt-2 {
    margin-top: var(--spacing-lg);
  }

  .input-group {
    margin-bottom: var(--spacing-lg);
  }

  .input-group:last-child {
    margin-bottom: 0;
  }

  .input-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
    color: var(--text-primary);
  }

  .input-hint {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .result-item {
    background: var(--bg-tertiary);
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
  }

  .result-item.highlight {
    border-color: var(--accent);
    background: rgba(0, 215, 98, 0.1);
  }

  .result-item.warning {
    border-color: var(--mc-gold);
  }

  .result-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .result-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
  }

  .result-item.warning .result-value {
    color: var(--mc-gold);
  }

  .result-subtext {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: var(--spacing-xs);
  }

  .info {
    background: var(--bg-tertiary);
  }

  .info ul {
    margin: 0 0 var(--spacing-md) 0;
    padding-left: var(--spacing-lg);
  }

  .info ul:last-child {
    margin-bottom: 0;
  }

  .info li {
    margin-bottom: var(--spacing-sm);
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .info li:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .result-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
