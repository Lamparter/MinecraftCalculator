<script>
  let devices = 10;
  let cableType = 'glass';

  const cables = {
    'glass': { channels: 8, name: 'ME Glass Cable' },
    'covered': { channels: 8, name: 'ME Covered Cable' },
    'dense': { channels: 32, name: 'ME Dense Cable' }
  };

  $: currentCable = cables[cableType];
  $: channelsNeeded = devices;
  $: cablesNeeded = Math.ceil(channelsNeeded / currentCable.channels);
  $: p2pTunnels = Math.max(0, Math.ceil((devices - 32) / 32));
</script>

<div class="calculator">
  <div class="calc-section">
    <h3>Network Configuration</h3>

    <div class="input-group">
      <label for="devices">Number of Devices</label>
      <input
        id="devices"
        type="number"
        bind:value={devices}
        min="1"
        max="1000"
        step="1"
      />
      <span class="input-hint">ME interfaces, drives, terminals, etc.</span>
    </div>

    <div class="input-group">
      <label for="cableType">Cable Type</label>
      <select id="cableType" bind:value={cableType}>
        <option value="glass">ME Glass Cable (8 channels)</option>
        <option value="covered">ME Covered Cable (8 channels)</option>
        <option value="dense">ME Dense Cable (32 channels)</option>
      </select>
    </div>
  </div>

  <div class="calc-section results">
    <h3>Results</h3>

    <div class="result-grid">
      <div class="result-item highlight">
        <div class="result-label">Channels Needed</div>
        <div class="result-value">{channelsNeeded}</div>
      </div>

      <div class="result-item">
        <div class="result-label">Cable Runs Required</div>
        <div class="result-value">{cablesNeeded}</div>
        <div class="result-subtext">{currentCable.name}</div>
      </div>

      <div class="result-item">
        <div class="result-label">Channels per Cable</div>
        <div class="result-value">{currentCable.channels}</div>
      </div>

      {#if devices > 32}
        <div class="result-item warning">
          <div class="result-label">P2P Tunnels Recommended</div>
          <div class="result-value">{p2pTunnels}</div>
          <div class="result-subtext">to manage channels</div>
        </div>
      {/if}
    </div>
  </div>

  <div class="calc-section info">
    <h3>💡 Channel Management Tips</h3>
    <ul>
      <li><strong>Dense Cables:</strong> Backbone of large networks (32 channels)</li>
      <li><strong>P2P Tunnels:</strong> Transport channels through single channel</li>
      <li><strong>Sub-Networks:</strong> Use interfaces to create separate networks</li>
      <li><strong>Smart Cables:</strong> Show channel usage with colored lines</li>
      <li><strong>Controllers:</strong> Add up to 32 channels per controller face</li>
    </ul>

    <h3 class="mt-2">📊 Channel Usage</h3>
    <ul>
      <li>ME Interface: 1 channel</li>
      <li>ME Drive: 1 channel</li>
      <li>ME Terminal: 1 channel</li>
      <li>Storage Bus: 1 channel</li>
      <li>Import/Export Bus: 1 channel each</li>
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
