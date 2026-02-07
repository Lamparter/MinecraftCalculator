export const calculators = [
  {
    id: 'mekanism',
    name: '🔥 Mekanism',
    calculators: [
      {
        id: 'mekanism-fission',
        name: 'Fission Reactor Planner',
        icon: '⚛️',
        description: 'Calculate fuel burn rate, coolant requirements, and heat output',
        category: 'mekanism'
      },
      {
        id: 'mekanism-fusion',
        name: 'Fusion Reactor Planner',
        icon: '⚡',
        description: 'Calculate injection rate, fuel consumption, and laser power',
        category: 'mekanism'
      },
      {
        id: 'mekanism-processing',
        name: 'Ore Processing Ratios',
        icon: '🔄',
        description: 'Calculate ore multiplication and machine ratios',
        category: 'mekanism'
      },
      {
        id: 'mekanism-chemical',
        name: 'Chemical Recipes',
        icon: '🧪',
        description: 'Calculate chemical processing chains and gas consumption',
        category: 'mekanism'
      },
      {
        id: 'mekanism-power',
        name: 'Power Generation',
        icon: '🌬️',
        description: 'Calculate wind/solar generators needed for your setup',
        category: 'mekanism'
      }
    ]
  },
  {
    id: 'create',
    name: '⚙️ Create',
    calculators: [
      {
        id: 'create-stress',
        name: 'Stress & Speed Calculator',
        icon: '💪',
        description: 'Calculate stress units, gear ratios, and water wheels',
        category: 'create'
      },
      {
        id: 'create-throughput',
        name: 'Factory Throughput Planner',
        icon: '📦',
        description: 'Calculate belt speed, items per second, and machine counts',
        category: 'create'
      },
      {
        id: 'create-assembly',
        name: 'Sequenced Assembly Planner',
        icon: '🔧',
        description: 'Calculate assembly success rates and material costs',
        category: 'create'
      }
    ]
  },
  {
    id: 'thermal',
    name: '🔋 Thermal Series',
    calculators: [
      {
        id: 'thermal-dynamo',
        name: 'Dynamo Output Planner',
        icon: '⚡',
        description: 'Calculate RF/t output and fuel efficiency',
        category: 'thermal'
      },
      {
        id: 'thermal-processing',
        name: 'Fluid & Item Processing',
        icon: '🏭',
        description: 'Calculate machine ratios and processing chains',
        category: 'thermal'
      }
    ]
  },
  {
    id: 'ae2',
    name: '💾 Applied Energistics 2',
    calculators: [
      {
        id: 'ae2-storage',
        name: 'Storage Planner',
        icon: '📦',
        description: 'Calculate storage cells and material costs',
        category: 'ae2'
      },
      {
        id: 'ae2-channel',
        name: 'Channel Planner',
        icon: '🔌',
        description: 'Plan cable layouts and P2P tunnels',
        category: 'ae2'
      },
      {
        id: 'ae2-crafting',
        name: 'Crafting Co-Processor Planner',
        icon: '⚙️',
        description: 'Calculate parallel crafting and time estimation',
        category: 'ae2'
      }
    ]
  },
  {
    id: 'botania',
    name: '🌱 Botania',
    calculators: [
      {
        id: 'botania-mana',
        name: 'Mana Generation Planner',
        icon: '🌼',
        description: 'Calculate mana per tick and pool fill times',
        category: 'botania'
      },
      {
        id: 'botania-spreader',
        name: 'Mana Spreader Calculator',
        icon: '🔮',
        description: 'Calculate spreader throughput and burst mechanics',
        category: 'botania'
      }
    ]
  },
  {
    id: 'industrial-foregoing',
    name: '🏭 Industrial Foregoing',
    calculators: [
      {
        id: 'if-mob',
        name: 'Mob Farm Planner',
        icon: '🐄',
        description: 'Calculate essence production and power costs',
        category: 'industrial-foregoing'
      },
      {
        id: 'if-crop',
        name: 'Crop Farm Planner',
        icon: '🌾',
        description: 'Calculate harvester throughput and fertilizer rates',
        category: 'industrial-foregoing'
      }
    ]
  },
  {
    id: 'modpack',
    name: '🌐 Modpack-Wide Tools',
    calculators: [
      {
        id: 'modpack-power',
        name: 'Power Grid Planner',
        icon: '🔌',
        description: 'Calculate total RF/t and generator requirements',
        category: 'modpack'
      },
      {
        id: 'modpack-resource',
        name: 'Resource Cost Calculator',
        icon: '💎',
        description: 'Generate shopping lists for complex builds',
        category: 'modpack'
      },
      {
        id: 'modpack-multiblock',
        name: 'Multiblock Planner',
        icon: '🏗️',
        description: 'Material lists for multiblock structures',
        category: 'modpack'
      }
    ]
  }
];
