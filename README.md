# ⛏️ Minecraft Mod Calculators

A comprehensive web-based calculator suite for popular Minecraft mods, built with Svelte. Features a sleek, responsive Minecraft-inspired design with 20+ calculators covering everything from Mekanism reactors to Create factories.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then visit http://localhost:5173

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **20+ Professional Calculators** covering the most popular Minecraft mods
- **Responsive Design** - works perfectly on desktop, tablet, and mobile
- **Modal Interface** - clean popup system for each calculator
- **Minecraft-Themed UI** - dark theme with Minecraft-inspired aesthetics
- **Real-Time Calculations** - instant results as you type
- **Built with Svelte** - fast, reactive, and lightweight

## 🔥 Included Calculators

### Mekanism (5 Calculators)
- ⚛️ **Fission Reactor Planner** - Calculate fuel burn rates, coolant requirements, and heat output
- ⚡ **Fusion Reactor Planner** - Determine injection rates, fuel consumption, and laser power needed
- 🔄 **Ore Processing Ratios** - Plan ore multiplication setups (2x to 5x)
- 🧪 **Chemical Recipes** - Calculate chemical processing chains and gas consumption
- 🌬️ **Power Generation** - Determine how many generators you need

### Create Mod (3 Calculators)
- 💪 **Stress & Speed Calculator** - Calculate stress units, gear ratios, and rotation speeds
- 📦 **Factory Throughput Planner** - Optimize belt speeds and machine counts
- 🔧 **Sequenced Assembly Planner** - Calculate success rates and material costs

### Thermal Series (2 Calculators)
- ⚡ **Dynamo Output Planner** - Calculate RF/t output with different fuels
- 🏭 **Fluid & Item Processing** - Plan machine ratios and processing chains

### Applied Energistics 2 (3 Calculators)
- 📦 **Storage Planner** - Calculate storage cell requirements and material costs
- 🔌 **Channel Planner** - Plan cable layouts and P2P tunnels
- ⚙️ **Crafting Co-Processor Planner** - Optimize parallel crafting setups

### Botania (2 Calculators)
- 🌼 **Mana Generation Planner** - Calculate mana generation rates and pool fill times
- 🔮 **Mana Spreader Calculator** - Optimize spreader throughput and burst mechanics

### Industrial Foregoing (2 Calculators)
- 🐄 **Mob Farm Planner** - Calculate essence production and power costs
- 🌾 **Crop Farm Planner** - Optimize harvester throughput and fertilizer usage

### Modpack-Wide Tools (3 Calculators)
- 🔌 **Power Grid Planner** - Calculate total RF/t requirements across all mods
- 💎 **Resource Cost Calculator** - Generate comprehensive material shopping lists
- 🏗️ **Multiblock Planner** - Get material lists for large multiblock structures

## 🎨 Design Features

- **Dark Minecraft Theme** - Easy on the eyes during long gaming sessions
- **Smooth Animations** - Professional hover effects and transitions
- **Intuitive UI** - Clear labels, helpful tooltips, and color-coded results
- **Keyboard Support** - Press ESC to close modals
- **Mobile Responsive** - Works great on phones and tablets

## 🛠️ Technology Stack

- **Frontend Framework**: Svelte 4
- **Build Tool**: Vite 5
- **Styling**: Custom CSS with CSS variables
- **No External Libraries** - Lightweight and fast

## 📄 Project Structure

```
MinecraftCalculator/
├── src/
│   ├── components/
│   │   ├── calculators/          # 20+ calculator components
│   │   │   ├── MekanismFission.svelte
│   │   │   ├── MekanismFusion.svelte
│   │   │   ├── CreateStress.svelte
│   │   │   └── ... (17 more)
│   │   ├── CalculatorGrid.svelte # Main calculator grid
│   │   └── Modal.svelte           # Modal popup system
│   ├── data/
│   │   └── calculators.js         # Calculator metadata
│   ├── App.svelte                 # Main app component
│   ├── main.js                    # Entry point
│   └── app.css                    # Global styles & theme
├── index.html
├── package.json
├── vite.config.js
├── svelte.config.js
└── README.md
```

## 🎯 Usage Examples

### Planning a Mekanism Fission Reactor
1. Click the "Fission Reactor Planner" card
2. Enter your desired burn rate (1-100 mB/t)
3. Get instant calculations for:
   - Coolant requirements
   - Steam production
   - Heat output
   - Fuel consumption per hour

### Optimizing a Create Factory
1. Open "Factory Throughput Planner"
2. Input your belt speed and machine counts
3. See bottleneck analysis and efficiency ratings
4. Adjust machines to optimize throughput

### Building an AE2 Network
1. Use "Storage Planner" to calculate storage cells needed
2. Use "Channel Planner" to design your cable layout
3. Use "Crafting Co-Processor Planner" to optimize auto-crafting
4. Get complete material lists for your build

## 🤝 Contributing

Contributions are welcome! To add a new calculator:

1. Create a new Svelte component in `src/components/calculators/`
2. Add calculator metadata to `src/data/calculators.js`
3. Import the component in `src/components/Modal.svelte`
4. Test and submit a pull request

## 📝 License

See LICENSE file for details.

## 🎮 For the Community

Made with ❤️ for the Minecraft modding community. Happy calculating!

---

**Note:** Calculator values are based on default mod configurations. Adjust if your modpack uses custom configs.
