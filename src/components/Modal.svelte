<script>
  import { onMount } from 'svelte';

  // Import all calculator components
  import MekanismFission from './calculators/MekanismFission.svelte';
  import MekanismFusion from './calculators/MekanismFusion.svelte';
  import MekanismProcessing from './calculators/MekanismProcessing.svelte';
  import MekanismChemical from './calculators/MekanismChemical.svelte';
  import MekanismPower from './calculators/MekanismPower.svelte';
  import CreateStress from './calculators/CreateStress.svelte';
  import CreateThroughput from './calculators/CreateThroughput.svelte';
  import CreateAssembly from './calculators/CreateAssembly.svelte';
  import ThermalDynamo from './calculators/ThermalDynamo.svelte';
  import ThermalProcessing from './calculators/ThermalProcessing.svelte';
  import AE2Storage from './calculators/AE2Storage.svelte';
  import AE2Channel from './calculators/AE2Channel.svelte';
  import AE2Crafting from './calculators/AE2Crafting.svelte';
  import BotaniaMana from './calculators/BotaniaMana.svelte';
  import BotaniaSpreader from './calculators/BotaniaSpreader.svelte';
  import IFMob from './calculators/IFMob.svelte';
  import IFCrop from './calculators/IFCrop.svelte';
  import ModpackPower from './calculators/ModpackPower.svelte';
  import ModpackResource from './calculators/ModpackResource.svelte';
  import ModpackMultiblock from './calculators/ModpackMultiblock.svelte';

  export let calculator;
  export let onClose;

  const calculatorComponents = {
    'mekanism-fission': MekanismFission,
    'mekanism-fusion': MekanismFusion,
    'mekanism-processing': MekanismProcessing,
    'mekanism-chemical': MekanismChemical,
    'mekanism-power': MekanismPower,
    'create-stress': CreateStress,
    'create-throughput': CreateThroughput,
    'create-assembly': CreateAssembly,
    'thermal-dynamo': ThermalDynamo,
    'thermal-processing': ThermalProcessing,
    'ae2-storage': AE2Storage,
    'ae2-channel': AE2Channel,
    'ae2-crafting': AE2Crafting,
    'botania-mana': BotaniaMana,
    'botania-spreader': BotaniaSpreader,
    'if-mob': IFMob,
    'if-crop': IFCrop,
    'modpack-power': ModpackPower,
    'modpack-resource': ModpackResource,
    'modpack-multiblock': ModpackMultiblock,
  };

  let component = calculatorComponents[calculator.id];

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });
</script>

<div class="modal-overlay" on:click={handleBackdropClick} role="button" tabindex="0">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-title-wrapper">
        <span class="modal-icon">{calculator.icon}</span>
        <h2 class="modal-title">{calculator.name}</h2>
      </div>
      <button class="modal-close" on:click={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
    <div class="modal-body">
      {#if component}
        <svelte:component this={component} />
      {:else}
        <p>Calculator component not found</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--spacing-lg);
    overflow-y: auto;
  }

  .modal-content {
    background: var(--bg-secondary);
    border: 3px solid var(--border-color);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px var(--shadow);
    animation: slideIn 0.2s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 2px solid var(--border-color);
    background: var(--bg-tertiary);
  }

  .modal-title-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .modal-icon {
    font-size: 2rem;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--accent);
  }

  .modal-close {
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }

  .modal-close:hover {
    background: var(--bg-card);
    color: var(--accent);
    transform: none;
  }

  .modal-body {
    padding: var(--spacing-xl);
    overflow-y: auto;
    flex: 1;
  }

  @media (max-width: 768px) {
    .modal-overlay {
      padding: var(--spacing-sm);
    }

    .modal-content {
      max-height: 95vh;
    }

    .modal-header {
      padding: var(--spacing-md);
    }

    .modal-title {
      font-size: 1.25rem;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-body {
      padding: var(--spacing-lg);
    }
  }
</style>
