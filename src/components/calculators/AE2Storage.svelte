<script>
  let cellType = '1k';
  let uniqueItemTypes = 100;

  const cells = {
    '1k': { bytes: 1024, types: 63, cost: { certus: 1, redstone: 1, silicon: 3 } },
    '4k': { bytes: 4096, types: 63, cost: { certus: 4, redstone: 4, silicon: 12 } },
    '16k': { bytes: 16384, types: 63, cost: { certus: 16, redstone: 16, silicon: 48 } },
    '64k': { bytes: 65536, types: 63, cost: { certus: 64, redstone: 64, silicon: 192 } }
  };

  $: currentCell = cells[cellType];
  $: cellsNeeded = Math.ceil(uniqueItemTypes / currentCell.types);
  $: totalBytes = cellsNeeded * currentCell.bytes;
  $: certusNeeded = cellsNeeded * currentCell.cost.certus;
  $: redstoneNeeded = cellsNeeded * currentCell.cost.redstone;
  $: siliconNeeded = cellsNeeded * currentCell.cost.silicon;
</script>

<div class="calculator">
  <div class="calc-section">
    <h3>Storage Requirements</h3>

    <div class="input-group">
      <label for="uniqueItemTypes">Unique Item Types</label>
      <input
        id="uniqueItemTypes"
        type="number"
        bind:value={uniqueItemTypes}
        min="1"
        max="10000"
        step="10"
      />
      <span class="input-hint">Different item types to store</span>
    </div>

    <div class="input-group">
      <label for="cellType">Storage Cell Type</label>
      <select id="cellType" bind:value={cellType}>
        <option value="1k">1k Storage Cell</option>
        <option value="4k">4k Storage Cell</option>
        <option value="16k">16k Storage Cell</option>
        <option value="64k">64k Storage Cell</option>
      </select>
    </div>
  </div>

  <div class="calc-section results">
    <h3>Results</h3>

    <div class="result-grid">
      <div class="result-item highlight">
        <div class="result-label">Cells Needed</div>
        <div class="result-value">{cellsNeeded}</div>
        <div class="result-subtext">{cellType} cells</div>
      </div>

      <div class="result-item">
        <div class="result-label">Total Bytes</div>
        <div class="result-value">{totalBytes.toLocaleString()}</div>
        <div class="result-subtext">storage capacity</div>
      </div>

      <div class="result-item">
        <div class="result-label">Types per Cell</div>
        <div class="result-value">{currentCell.types}</div>
      </div>
    </div>
  </div>

  <div class="calc-section">
    <h3>Material Requirements</h3>

    <div class="result-grid">
      <div class="result-item">
        <div class="result-label">Certus Quartz</div>
        <div class="result-value">{certusNeeded}</div>
      </div>

      <div class="result-item">
        <div class="result-label">Redstone</div>
        <div class="result-value">{redstoneNeeded}</div>
      </div>

      <div class="result-item">
        <div class="result-label">Silicon</div>
        <div class="result-value">{siliconNeeded}</div>
      </div>
    </div>
  </div>

  <div class="calc-section info">
    <h3>💡 Storage Tips</h3>
    <ul>
      <li><strong>1k Cells:</strong> Best for early game or specialized storage</li>
      <li><strong>4k/16k:</strong> Good balance of cost and capacity</li>
      <li><strong>64k Cells:</strong> Endgame bulk storage</li>
      <li><strong>Item Types:</strong> Each cell holds max 63 different items</li>
      <li><strong>Partitioning:</strong> Reserve space for specific items</li>
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

  .result-subtext {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: var(--spacing-xs);
  }

  .info {
    background: var(--bg-tertiary);
  }

  .info ul {
    margin: 0;
    padding-left: var(--spacing-lg);
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
