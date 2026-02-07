// Modal System
const modal = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Calculator Data
const calculators = {
    'mekanism-fission': {
        title: '⚛️ Fission Reactor Planner',
        description: 'Calculate optimal fission reactor configuration based on burn rate.',
        render: () => `
            <div class="input-group">
                <label for="burn-rate">Burn Rate (mB/t)</label>
                <input type="number" id="burn-rate" value="1" min="1" max="100">
            </div>
            <div class="input-group">
                <label for="fuel-type">Fuel Type</label>
                <select id="fuel-type">
                    <option value="fissile">Fissile Fuel</option>
                    <option value="oxide">Uranium Oxide</option>
                </select>
            </div>
            <button class="btn" onclick="calculateFission()">Calculate</button>
            <div id="fission-results" class="results"></div>
        `,
        calculate: () => {
            const burnRate = parseFloat(document.getElementById('burn-rate').value);
            const fuelType = document.getElementById('fuel-type').value;

            const energyPerBurn = fuelType === 'fissile' ? 1000000 : 800000;
            const heatPerBurn = 10000;
            const coolantPerHeat = 0.1;

            const totalEnergy = burnRate * energyPerBurn;
            const totalHeat = burnRate * heatPerBurn;
            const coolantNeeded = totalHeat * coolantPerHeat;
            const steamProduced = coolantNeeded * 10;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Energy Output:</span>
                    <span class="result-value">${totalEnergy.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Heat Generated:</span>
                    <span class="result-value">${totalHeat.toLocaleString()} K/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Coolant Required:</span>
                    <span class="result-value">${coolantNeeded.toLocaleString()} mB/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Steam Produced:</span>
                    <span class="result-value">${steamProduced.toLocaleString()} mB/t</span>
                </div>
                <div class="info-box success">
                    <strong>Tip:</strong> This steam can power a turbine generating approximately ${(steamProduced * 10).toLocaleString()} RF/t
                </div>
            `;
        }
    },

    'mekanism-fusion': {
        title: '⚡ Fusion Reactor Planner',
        description: 'Calculate fusion reactor requirements and output.',
        render: () => `
            <div class="input-group">
                <label for="injection-rate">Injection Rate</label>
                <input type="number" id="injection-rate" value="2" min="2" max="98">
            </div>
            <div class="input-group">
                <label for="fuel-choice">Fuel Combination</label>
                <select id="fuel-choice">
                    <option value="dt">Deuterium-Tritium</option>
                    <option value="d">Deuterium Only</option>
                </select>
            </div>
            <button class="btn" onclick="calculateFusion()">Calculate</button>
            <div id="fusion-results" class="results"></div>
        `,
        calculate: () => {
            const injectionRate = parseFloat(document.getElementById('injection-rate').value);
            const fuelChoice = document.getElementById('fuel-choice').value;

            const energyMultiplier = fuelChoice === 'dt' ? 1 : 0.6;
            const baseEnergy = 16000000;
            const laserPower = 50000000;

            const energyOutput = injectionRate * baseEnergy * energyMultiplier;
            const deuteriumPerTick = injectionRate;
            const tritiumPerTick = fuelChoice === 'dt' ? injectionRate : 0;
            const laserRequired = laserPower;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Energy Output:</span>
                    <span class="result-value">${energyOutput.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Deuterium Consumption:</span>
                    <span class="result-value">${deuteriumPerTick} mB/t</span>
                </div>
                ${fuelChoice === 'dt' ? `
                <div class="result-item">
                    <span class="result-label">Tritium Consumption:</span>
                    <span class="result-value">${tritiumPerTick} mB/t</span>
                </div>
                ` : ''}
                <div class="result-item">
                    <span class="result-label">Laser Power Required (Ignition):</span>
                    <span class="result-value">${laserRequired.toLocaleString()} RF</span>
                </div>
                <div class="info-box">
                    <strong>Note:</strong> You'll need approximately ${Math.ceil(laserRequired / 500000)} max tier laser amplifiers to ignite the reactor.
                </div>
            `;
        }
    },

    'mekanism-processing': {
        title: '🔄 Ore Processing Ratios',
        description: 'Calculate ore multiplication setup and machine ratios.',
        render: () => `
            <div class="input-group">
                <label for="ore-amount">Number of Raw Ores</label>
                <input type="number" id="ore-amount" value="1000" min="1">
            </div>
            <div class="input-group">
                <label for="processing-level">Processing Level</label>
                <select id="processing-level">
                    <option value="2">Doubling (Enrichment Chamber)</option>
                    <option value="3">Tripling (Purification Chamber)</option>
                    <option value="4">Quadrupling (Chemical Injection)</option>
                    <option value="5">Quintupling (Atomic Disassembler)</option>
                </select>
            </div>
            <button class="btn" onclick="calculateProcessing()">Calculate</button>
            <div id="processing-results" class="results"></div>
        `,
        calculate: () => {
            const oreAmount = parseFloat(document.getElementById('ore-amount').value);
            const processingLevel = parseFloat(document.getElementById('processing-level').value);

            const outputAmount = oreAmount * processingLevel;
            const powerPerOre = [0, 0, 50, 200, 400, 2500][processingLevel];
            const totalPower = oreAmount * powerPerOre;

            const machineNames = {
                2: 'Enrichment Chamber',
                3: 'Purification Chamber + Electrolytic Separator',
                4: 'Chemical Injection Chamber + Chemical Infuser + Electrolytic Separator',
                5: 'Precision Sawmill + Purification Chamber + Chemical Injection Chamber + full chain'
            };

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Input Ores:</span>
                    <span class="result-value">${oreAmount.toLocaleString()}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Output Ingots:</span>
                    <span class="result-value">${outputAmount.toLocaleString()}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Multiplication Factor:</span>
                    <span class="result-value">${processingLevel}x</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Power Required:</span>
                    <span class="result-value">${totalPower.toLocaleString()} RF</span>
                </div>
                <div class="info-box">
                    <strong>Machines Required:</strong><br>${machineNames[processingLevel]}
                </div>
            `;
        }
    },

    'mekanism-chemical': {
        title: '🧪 Chemical Processing Chain',
        description: 'Calculate chemical production chains and gas requirements.',
        render: () => `
            <div class="input-group">
                <label for="chemical-chain">Chemical Chain</label>
                <select id="chemical-chain">
                    <option value="hdpe">Ethylene → HDPE</option>
                    <option value="ethylene">Substrate → Ethylene</option>
                    <option value="oxygen">Water → Oxygen + Hydrogen</option>
                    <option value="uranium">Uranium → Yellow Cake</option>
                </select>
            </div>
            <div class="input-group">
                <label for="desired-output">Desired Output (mB/t)</label>
                <input type="number" id="desired-output" value="100" min="1">
            </div>
            <button class="btn" onclick="calculateChemical()">Calculate</button>
            <div id="chemical-results" class="results"></div>
        `,
        calculate: () => {
            const chain = document.getElementById('chemical-chain').value;
            const output = parseFloat(document.getElementById('desired-output').value);

            const chains = {
                'hdpe': {
                    inputs: { ethylene: 1, oxygen: 1 },
                    outputs: { hdpe: 1 },
                    power: 10,
                    machine: 'Pressurized Reaction Chamber'
                },
                'ethylene': {
                    inputs: { substrate: 1, water: 10 },
                    outputs: { ethylene: 1, biofuel: 1 },
                    power: 100,
                    machine: 'Pressurized Reaction Chamber'
                },
                'oxygen': {
                    inputs: { water: 2 },
                    outputs: { hydrogen: 2, oxygen: 1 },
                    power: 100,
                    machine: 'Electrolytic Separator'
                },
                'uranium': {
                    inputs: { uraniumOre: 1, sulfuricAcid: 10 },
                    outputs: { yellowCake: 3 },
                    power: 200,
                    machine: 'Chemical Dissolution Chamber'
                }
            };

            const selected = chains[chain];
            let resultHTML = '<h3>Results</h3>';

            resultHTML += '<h4>Required Inputs:</h4>';
            for (const [input, ratio] of Object.entries(selected.inputs)) {
                resultHTML += `
                    <div class="result-item">
                        <span class="result-label">${input.charAt(0).toUpperCase() + input.slice(1)}:</span>
                        <span class="result-value">${(output * ratio).toLocaleString()} mB/t</span>
                    </div>
                `;
            }

            resultHTML += '<h4>Outputs:</h4>';
            for (const [out, ratio] of Object.entries(selected.outputs)) {
                resultHTML += `
                    <div class="result-item">
                        <span class="result-label">${out.toUpperCase()}:</span>
                        <span class="result-value">${(output * ratio).toLocaleString()} mB/t</span>
                    </div>
                `;
            }

            resultHTML += `
                <div class="result-item">
                    <span class="result-label">Power Required:</span>
                    <span class="result-value">${(output * selected.power).toLocaleString()} RF/t</span>
                </div>
                <div class="info-box">
                    <strong>Machine:</strong> ${selected.machine}
                </div>
            `;

            return resultHTML;
        }
    },

    'mekanism-power': {
        title: '🌬️ Power Generation Calculator',
        description: 'Calculate how many generators you need for your machines.',
        render: () => `
            <div class="input-group">
                <label for="power-needed">Total Power Needed (RF/t)</label>
                <input type="number" id="power-needed" value="10000" min="1">
            </div>
            <div class="input-group">
                <label for="generator-type">Generator Type</label>
                <select id="generator-type">
                    <option value="60">Wind Generator (60 RF/t avg)</option>
                    <option value="40">Solar Generator (40 RF/t avg)</option>
                    <option value="80">Advanced Solar Generator (80 RF/t avg)</option>
                    <option value="3600">Gas-Burning Generator (3600 RF/t)</option>
                    <option value="160">Heat Generator (160 RF/t)</option>
                </select>
            </div>
            <button class="btn" onclick="calculatePower()">Calculate</button>
            <div id="power-results" class="results"></div>
        `,
        calculate: () => {
            const powerNeeded = parseFloat(document.getElementById('power-needed').value);
            const generatorOutput = parseFloat(document.getElementById('generator-type').value);

            const generatorsNeeded = Math.ceil(powerNeeded / generatorOutput);
            const actualOutput = generatorsNeeded * generatorOutput;
            const excess = actualOutput - powerNeeded;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Generators Needed:</span>
                    <span class="result-value">${generatorsNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Each Produces:</span>
                    <span class="result-value">${generatorOutput.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Output:</span>
                    <span class="result-value">${actualOutput.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Excess Power:</span>
                    <span class="result-value">${excess.toLocaleString()} RF/t</span>
                </div>
                <div class="info-box success">
                    <strong>Tip:</strong> Consider adding energy storage (Energy Cubes) to buffer power fluctuations.
                </div>
            `;
        }
    },

    'create-stress': {
        title: '💪 Stress & Speed Calculator',
        description: 'Calculate stress units and rotation speed for Create contraptions.',
        render: () => `
            <div class="input-group">
                <label for="stress-needed">Stress Units Needed (SU)</label>
                <input type="number" id="stress-needed" value="512" min="1">
            </div>
            <div class="input-group">
                <label for="power-source">Power Source</label>
                <select id="power-source">
                    <option value="512">Water Wheel (512 SU @ 16 RPM)</option>
                    <option value="2048">Windmill (2048 SU @ 16 RPM)</option>
                    <option value="16384">Furnace Engine (16384 SU)</option>
                    <option value="4096">Steam Engine (4096 SU)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="gear-ratio">Gear Ratio (Input:Output)</label>
                <input type="text" id="gear-ratio" value="1:1" placeholder="e.g., 2:1 or 1:2">
            </div>
            <button class="btn" onclick="calculateStress()">Calculate</button>
            <div id="stress-results" class="results"></div>
        `,
        calculate: () => {
            const stressNeeded = parseFloat(document.getElementById('stress-needed').value);
            const powerSource = parseFloat(document.getElementById('power-source').value);
            const gearRatioStr = document.getElementById('gear-ratio').value;

            const [input, output] = gearRatioStr.split(':').map(x => parseFloat(x));
            const ratio = input / output;

            const baseRPM = 16;
            const outputRPM = baseRPM * ratio;
            const stressCapacity = powerSource / ratio;

            const sourcesNeeded = Math.ceil(stressNeeded / stressCapacity);

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Power Sources Needed:</span>
                    <span class="result-value">${sourcesNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Stress Capacity (per source):</span>
                    <span class="result-value">${stressCapacity.toFixed(2)} SU</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Capacity:</span>
                    <span class="result-value">${(sourcesNeeded * stressCapacity).toFixed(2)} SU</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Output Speed:</span>
                    <span class="result-value">${outputRPM.toFixed(2)} RPM</span>
                </div>
                <div class="info-box">
                    <strong>Note:</strong> Higher speed = lower stress capacity. Gear up for speed, gear down for power.
                </div>
            `;
        }
    },

    'create-throughput': {
        title: '📦 Factory Throughput Planner',
        description: 'Calculate belt speeds and machine requirements.',
        render: () => `
            <div class="input-group">
                <label for="items-per-second">Desired Items Per Second</label>
                <input type="number" id="items-per-second" value="1" min="0.1" step="0.1">
            </div>
            <div class="input-group">
                <label for="machine-type">Machine Type</label>
                <select id="machine-type">
                    <option value="100">Mechanical Press (100 ticks)</option>
                    <option value="100">Millstone (100 ticks)</option>
                    <option value="150">Mechanical Mixer (150 ticks)</option>
                    <option value="200">Encased Fan (200 ticks)</option>
                    <option value="50">Deployer (50 ticks)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="belt-speed">Belt Speed (RPM)</label>
                <input type="number" id="belt-speed" value="32" min="1">
            </div>
            <button class="btn" onclick="calculateThroughput()">Calculate</button>
            <div id="throughput-results" class="results"></div>
        `,
        calculate: () => {
            const itemsPerSecond = parseFloat(document.getElementById('items-per-second').value);
            const machineTicks = parseFloat(document.getElementById('machine-type').value);
            const beltSpeed = parseFloat(document.getElementById('belt-speed').value);

            const secondsPerItem = machineTicks / 20;
            const itemsPerSecondPerMachine = 1 / secondsPerItem;
            const machinesNeeded = Math.ceil(itemsPerSecond / itemsPerSecondPerMachine);

            const beltItemsPerSecond = beltSpeed / 20;
            const beltSufficient = beltItemsPerSecond >= itemsPerSecond;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Machines Needed:</span>
                    <span class="result-value">${machinesNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Processing Time Per Item:</span>
                    <span class="result-value">${secondsPerItem.toFixed(2)} seconds</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Items/Second Per Machine:</span>
                    <span class="result-value">${itemsPerSecondPerMachine.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Belt Capacity:</span>
                    <span class="result-value">${beltItemsPerSecond.toFixed(2)} items/second</span>
                </div>
                <div class="info-box ${beltSufficient ? 'success' : 'danger'}">
                    <strong>${beltSufficient ? '✓' : '✗'} Belt Status:</strong>
                    ${beltSufficient ? 'Belt speed is sufficient' : 'Belt speed is too slow! Increase RPM or use multiple belts'}
                </div>
            `;
        }
    },

    'create-assembly': {
        title: '🔧 Sequenced Assembly Planner',
        description: 'Calculate sequenced assembly success rates and costs.',
        render: () => `
            <div class="input-group">
                <label for="assembly-loops">Number of Assembly Loops</label>
                <input type="number" id="assembly-loops" value="3" min="1" max="10">
            </div>
            <div class="input-group">
                <label for="success-chance">Success Chance Per Loop (%)</label>
                <input type="number" id="success-chance" value="50" min="1" max="100">
            </div>
            <div class="input-group">
                <label for="items-needed">Finished Items Needed</label>
                <input type="number" id="items-needed" value="10" min="1">
            </div>
            <button class="btn" onclick="calculateAssembly()">Calculate</button>
            <div id="assembly-results" class="results"></div>
        `,
        calculate: () => {
            const loops = parseInt(document.getElementById('assembly-loops').value);
            const successChance = parseFloat(document.getElementById('success-chance').value) / 100;
            const itemsNeeded = parseInt(document.getElementById('items-needed').value);

            const overallSuccess = Math.pow(successChance, loops);
            const expectedAttempts = Math.ceil(itemsNeeded / overallSuccess);
            const expectedWaste = expectedAttempts - itemsNeeded;
            const efficiencyPercent = (itemsNeeded / expectedAttempts) * 100;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Overall Success Chance:</span>
                    <span class="result-value">${(overallSuccess * 100).toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expected Attempts Needed:</span>
                    <span class="result-value">${expectedAttempts}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expected Waste:</span>
                    <span class="result-value">${expectedWaste}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Material Efficiency:</span>
                    <span class="result-value">${efficiencyPercent.toFixed(2)}%</span>
                </div>
                <div class="info-box">
                    <strong>Tip:</strong> Craft ${expectedAttempts} starter items to statistically get ${itemsNeeded} finished items.
                </div>
            `;
        }
    },

    'thermal-dynamo': {
        title: '⚡ Dynamo Output Planner',
        description: 'Calculate Thermal dynamo power output and fuel requirements.',
        render: () => `
            <div class="input-group">
                <label for="dynamo-type">Dynamo Type</label>
                <select id="dynamo-type">
                    <option value="40">Stirling Dynamo (40 RF/t base)</option>
                    <option value="80">Compression Dynamo (80 RF/t base)</option>
                    <option value="80">Magmatic Dynamo (80 RF/t base)</option>
                    <option value="100">Numismatic Dynamo (100 RF/t base)</option>
                    <option value="100">Lapidary Dynamo (100 RF/t base)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="augments">Augment Tier</label>
                <select id="augments">
                    <option value="1">None (1x output)</option>
                    <option value="1.5">Basic (1.5x output)</option>
                    <option value="2">Hardened (2x output)</option>
                    <option value="2.5">Reinforced (2.5x output)</option>
                    <option value="3">Signalum (3x output)</option>
                    <option value="3.5">Resonant (3.5x output)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="power-target">Target Power Output (RF/t)</label>
                <input type="number" id="power-target" value="1000" min="1">
            </div>
            <button class="btn" onclick="calculateDynamo()">Calculate</button>
            <div id="dynamo-results" class="results"></div>
        `,
        calculate: () => {
            const baseOutput = parseFloat(document.getElementById('dynamo-type').value);
            const augment = parseFloat(document.getElementById('augments').value);
            const targetPower = parseFloat(document.getElementById('power-target').value);

            const outputPerDynamo = baseOutput * augment;
            const dynamosNeeded = Math.ceil(targetPower / outputPerDynamo);
            const actualOutput = dynamosNeeded * outputPerDynamo;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Dynamos Needed:</span>
                    <span class="result-value">${dynamosNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Output Per Dynamo:</span>
                    <span class="result-value">${outputPerDynamo.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Output:</span>
                    <span class="result-value">${actualOutput.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Excess Power:</span>
                    <span class="result-value">${(actualOutput - targetPower).toLocaleString()} RF/t</span>
                </div>
                <div class="info-box success">
                    <strong>Tip:</strong> Higher tier augments provide better efficiency but cost more resources.
                </div>
            `;
        }
    },

    'thermal-processing': {
        title: '🏭 Thermal Processing Calculator',
        description: 'Calculate Thermal machine processing chains and ratios.',
        render: () => `
            <div class="input-group">
                <label for="process-type">Processing Chain</label>
                <select id="process-type">
                    <option value="pulverizer">Pulverizer → Ore Doubling</option>
                    <option value="induction">Pulverizer → Induction Smelter</option>
                    <option value="crucible">Magma Crucible → Fluid Transposer</option>
                    <option value="sawmill">Sawmill → Wood Processing</option>
                </select>
            </div>
            <div class="input-group">
                <label for="items-to-process">Items to Process</label>
                <input type="number" id="items-to-process" value="1000" min="1">
            </div>
            <button class="btn" onclick="calculateThermalProcessing()">Calculate</button>
            <div id="thermal-processing-results" class="results"></div>
        `,
        calculate: () => {
            const processType = document.getElementById('process-type').value;
            const itemsToProcess = parseFloat(document.getElementById('items-to-process').value);

            const processes = {
                pulverizer: {
                    output: 2,
                    power: 4000,
                    bonus: 'dust',
                    bonusChance: 0.1
                },
                induction: {
                    output: 2,
                    power: 8000,
                    bonus: 'slag',
                    bonusChance: 0.75
                },
                crucible: {
                    output: 1,
                    power: 40000,
                    bonus: 'none',
                    bonusChance: 0
                },
                sawmill: {
                    output: 6,
                    power: 4000,
                    bonus: 'sawdust',
                    bonusChance: 0.5
                }
            };

            const selected = processes[processType];
            const totalOutput = itemsToProcess * selected.output;
            const totalPower = itemsToProcess * selected.power;
            const bonusOutput = Math.floor(itemsToProcess * selected.bonusChance);

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Main Output:</span>
                    <span class="result-value">${totalOutput.toLocaleString()} items</span>
                </div>
                ${bonusOutput > 0 ? `
                <div class="result-item">
                    <span class="result-label">Bonus Output (${selected.bonus}):</span>
                    <span class="result-value">${bonusOutput.toLocaleString()} items</span>
                </div>
                ` : ''}
                <div class="result-item">
                    <span class="result-label">Total Power Required:</span>
                    <span class="result-value">${totalPower.toLocaleString()} RF</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Power Per Operation:</span>
                    <span class="result-value">${selected.power.toLocaleString()} RF</span>
                </div>
            `;
        }
    },

    'ae2-storage': {
        title: '📦 AE2 Storage Planner',
        description: 'Calculate storage cell requirements and costs.',
        render: () => `
            <div class="input-group">
                <label for="unique-items">Number of Unique Item Types</label>
                <input type="number" id="unique-items" value="63" min="1">
            </div>
            <div class="input-group">
                <label for="total-stacks">Total Item Stacks</label>
                <input type="number" id="total-stacks" value="1000" min="1">
            </div>
            <div class="input-group">
                <label for="cell-type">Preferred Cell Type</label>
                <select id="cell-type">
                    <option value="1024">1k Cell (1024 bytes, 63 types)</option>
                    <option value="4096">4k Cell (4096 bytes, 63 types)</option>
                    <option value="16384">16k Cell (16384 bytes, 63 types)</option>
                    <option value="65536">64k Cell (65536 bytes, 63 types)</option>
                </select>
            </div>
            <button class="btn" onclick="calculateAE2Storage()">Calculate</button>
            <div id="ae2-storage-results" class="results"></div>
        `,
        calculate: () => {
            const uniqueItems = parseInt(document.getElementById('unique-items').value);
            const totalStacks = parseInt(document.getElementById('total-stacks').value);
            const cellCapacity = parseInt(document.getElementById('cell-type').value);

            const bytesPerStack = 8;
            const typesPerCell = 63;
            const cellOverhead = uniqueItems * bytesPerStack;

            const totalBytes = (totalStacks * 64 * bytesPerStack) + cellOverhead;
            const cellsNeeded = Math.ceil(totalBytes / cellCapacity);
            const cellsForTypes = Math.ceil(uniqueItems / typesPerCell);
            const actualCellsNeeded = Math.max(cellsNeeded, cellsForTypes);

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Cells Needed (Capacity):</span>
                    <span class="result-value">${cellsNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Cells Needed (Item Types):</span>
                    <span class="result-value">${cellsForTypes}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Recommended Total Cells:</span>
                    <span class="result-value">${actualCellsNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Bytes Used:</span>
                    <span class="result-value">${totalBytes.toLocaleString()} bytes</span>
                </div>
                <div class="info-box">
                    <strong>Tip:</strong> Each cell can store 63 different item types. Use Partition Cells for better organization!
                </div>
            `;
        }
    },

    'ae2-channel': {
        title: '🔌 AE2 Channel Planner',
        description: 'Plan AE2 cable layouts and channel distribution.',
        render: () => `
            <div class="input-group">
                <label for="devices">Number of Devices</label>
                <input type="number" id="devices" value="16" min="1">
            </div>
            <div class="input-group">
                <label for="cable-type">Cable Type</label>
                <select id="cable-type">
                    <option value="8">Glass/Covered Cable (8 channels)</option>
                    <option value="32">Dense Cable (32 channels)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="use-p2p">Use P2P Tunnels?</label>
                <select id="use-p2p">
                    <option value="no">No</option>
                    <option value="yes">Yes (32 channels per tunnel)</option>
                </select>
            </div>
            <button class="btn" onclick="calculateAE2Channels()">Calculate</button>
            <div id="ae2-channel-results" class="results"></div>
        `,
        calculate: () => {
            const devices = parseInt(document.getElementById('devices').value);
            const channelsPerCable = parseInt(document.getElementById('cable-type').value);
            const useP2P = document.getElementById('use-p2p').value === 'yes';

            const cablesNeeded = Math.ceil(devices / channelsPerCable);

            let resultHTML = '<h3>Results</h3>';

            if (useP2P) {
                const channelsPerTunnel = 32;
                const tunnelsNeeded = Math.ceil(devices / channelsPerTunnel);
                const tunnelChannelsUsed = tunnelsNeeded * 2;

                resultHTML += `
                    <div class="result-item">
                        <span class="result-label">P2P Tunnels Needed:</span>
                        <span class="result-value">${tunnelsNeeded}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Channels Used by Tunnels:</span>
                        <span class="result-value">${tunnelChannelsUsed}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Devices Supported:</span>
                        <span class="result-value">${tunnelsNeeded * channelsPerTunnel}</span>
                    </div>
                    <div class="info-box success">
                        <strong>Tip:</strong> P2P tunnels let you send 32 channels through 1 channel - very efficient!
                    </div>
                `;
            } else {
                resultHTML += `
                    <div class="result-item">
                        <span class="result-label">Cables Needed:</span>
                        <span class="result-value">${cablesNeeded}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Channels Per Cable:</span>
                        <span class="result-value">${channelsPerCable}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Capacity:</span>
                        <span class="result-value">${cablesNeeded * channelsPerCable} channels</span>
                    </div>
                    ${devices > 32 ? `
                    <div class="info-box">
                        <strong>Tip:</strong> Consider using P2P tunnels for setups with more than 32 devices!
                    </div>
                    ` : ''}
                `;
            }

            return resultHTML;
        }
    },

    'ae2-crafting': {
        title: '⚙️ AE2 Crafting Co-Processor Planner',
        description: 'Calculate co-processor requirements for parallel crafting.',
        render: () => `
            <div class="input-group">
                <label for="parallel-crafts">Parallel Crafts Needed</label>
                <input type="number" id="parallel-crafts" value="5" min="1">
            </div>
            <div class="input-group">
                <label for="crafting-steps">Steps Per Craft</label>
                <input type="number" id="crafting-steps" value="3" min="1">
            </div>
            <div class="input-group">
                <label for="craft-time">Time Per Step (seconds)</label>
                <input type="number" id="craft-time" value="5" min="1">
            </div>
            <button class="btn" onclick="calculateAE2Crafting()">Calculate</button>
            <div id="ae2-crafting-results" class="results"></div>
        `,
        calculate: () => {
            const parallelCrafts = parseInt(document.getElementById('parallel-crafts').value);
            const craftingSteps = parseInt(document.getElementById('crafting-steps').value);
            const craftTime = parseFloat(document.getElementById('craft-time').value);

            const coProcessorsNeeded = parallelCrafts - 1;
            const totalCraftTime = craftingSteps * craftTime;
            const parallelTime = totalCraftTime / parallelCrafts;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Co-Processors Needed:</span>
                    <span class="result-value">${coProcessorsNeeded}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Parallel Crafts:</span>
                    <span class="result-value">${parallelCrafts}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Time Without Parallel:</span>
                    <span class="result-value">${(totalCraftTime * parallelCrafts).toFixed(2)}s</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Time With Parallel:</span>
                    <span class="result-value">${totalCraftTime.toFixed(2)}s</span>
                </div>
                <div class="info-box success">
                    <strong>Tip:</strong> Each co-processor adds 1 additional parallel craft. The base CPU gives you 1 craft.
                </div>
            `;
        }
    },

    'botania-mana': {
        title: '🌼 Botania Mana Generation Planner',
        description: 'Calculate mana generation rates and pool fill times.',
        render: () => `
            <div class="input-group">
                <label for="flower-type">Generating Flower</label>
                <select id="flower-type">
                    <option value="20">Endoflame (20 mana/s)</option>
                    <option value="40">Hydroangeas (40 mana/s burst)</option>
                    <option value="60">Gourmaryllis (60 mana/s avg)</option>
                    <option value="80">Rosa Arcana (80 mana/s)</option>
                    <option value="100">Spectrolus (100 mana/s)</option>
                    <option value="150">Shulk Me Not (150 mana/s)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="flower-count">Number of Flowers</label>
                <input type="number" id="flower-count" value="16" min="1">
            </div>
            <div class="input-group">
                <label for="target-mana">Target Mana Amount</label>
                <input type="number" id="target-mana" value="1000000" min="1">
            </div>
            <button class="btn" onclick="calculateBotaniaMana()">Calculate</button>
            <div id="botania-mana-results" class="results"></div>
        `,
        calculate: () => {
            const manaPerSecond = parseFloat(document.getElementById('flower-type').value);
            const flowerCount = parseInt(document.getElementById('flower-count').value);
            const targetMana = parseFloat(document.getElementById('target-mana').value);

            const totalManaPerSecond = manaPerSecond * flowerCount;
            const timeToFill = targetMana / totalManaPerSecond;
            const poolCapacity = 1000000;
            const poolsFilled = targetMana / poolCapacity;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Total Mana Generation:</span>
                    <span class="result-value">${totalManaPerSecond.toLocaleString()} mana/s</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Time to Generate:</span>
                    <span class="result-value">${timeToFill.toFixed(2)} seconds (${(timeToFill / 60).toFixed(2)} minutes)</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Mana Pools Equivalent:</span>
                    <span class="result-value">${poolsFilled.toFixed(2)} pools</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Mana Per Flower:</span>
                    <span class="result-value">${manaPerSecond.toLocaleString()} mana/s</span>
                </div>
                <div class="info-box">
                    <strong>Tip:</strong> A standard Mana Pool holds 1,000,000 mana. Diluted pools hold 10,000 mana.
                </div>
            `;
        }
    },

    'botania-spreader': {
        title: '🔮 Botania Mana Spreader Calculator',
        description: 'Calculate mana spreader throughput and burst mechanics.',
        render: () => `
            <div class="input-group">
                <label for="spreader-type">Spreader Type</label>
                <select id="spreader-type">
                    <option value="160">Mana Spreader (160 mana/burst)</option>
                    <option value="240">Elven Mana Spreader (240 mana/burst)</option>
                    <option value="640">Gaia Mana Spreader (640 mana/burst)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="lens-type">Lens Type</label>
                <select id="lens-type">
                    <option value="1">No Lens (1x speed)</option>
                    <option value="1.5">Velocity Lens (1.5x speed)</option>
                    <option value="2">Potency Lens (2x mana cost, longer range)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="distance">Distance (blocks)</label>
                <input type="number" id="distance" value="12" min="1" max="24">
            </div>
            <button class="btn" onclick="calculateBotaniaSpreader()">Calculate</button>
            <div id="botania-spreader-results" class="results"></div>
        `,
        calculate: () => {
            const burstMana = parseFloat(document.getElementById('spreader-type').value);
            const lensMultiplier = parseFloat(document.getElementById('lens-type').value);
            const distance = parseInt(document.getElementById('distance').value);

            const baseTicksPerBurst = 60;
            const ticksPerBurst = baseTicksPerBurst / lensMultiplier;
            const burstsPerSecond = 20 / ticksPerBurst;
            const manaPerSecond = burstMana * burstsPerSecond;

            const canReach = distance <= 12 + (lensMultiplier > 1 ? 4 : 0);

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Mana Per Burst:</span>
                    <span class="result-value">${burstMana.toLocaleString()} mana</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Bursts Per Second:</span>
                    <span class="result-value">${burstsPerSecond.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Mana Throughput:</span>
                    <span class="result-value">${manaPerSecond.toFixed(2)} mana/s</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Ticks Per Burst:</span>
                    <span class="result-value">${ticksPerBurst.toFixed(2)}</span>
                </div>
                <div class="info-box ${canReach ? 'success' : 'danger'}">
                    <strong>${canReach ? '✓' : '✗'} Range Check:</strong>
                    ${canReach ? 'Spreader can reach target distance' : 'Distance too far! Reduce distance or use a better lens'}
                </div>
            `;
        }
    },

    'if-mob': {
        title: '🐄 Industrial Foregoing Mob Farm Planner',
        description: 'Calculate mob essence production and power requirements.',
        render: () => `
            <div class="input-group">
                <label for="mob-type">Mob Type</label>
                <select id="mob-type">
                    <option value="20">Passive Mobs (20 essence)</option>
                    <option value="100">Hostile Mobs (100 essence)</option>
                    <option value="200">Nether Mobs (200 essence)</option>
                    <option value="500">Boss Mobs (500 essence)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="mobs-per-minute">Mobs Killed Per Minute</label>
                <input type="number" id="mobs-per-minute" value="20" min="1">
            </div>
            <div class="input-group">
                <label for="mob-grinder-tier">Mob Crusher Tier</label>
                <select id="mob-grinder-tier">
                    <option value="40">Basic (40 RF/t)</option>
                    <option value="80">Improved (80 RF/t)</option>
                    <option value="160">Advanced (160 RF/t)</option>
                    <option value="320">Supreme (320 RF/t)</option>
                </select>
            </div>
            <button class="btn" onclick="calculateIFMob()">Calculate</button>
            <div id="if-mob-results" class="results"></div>
        `,
        calculate: () => {
            const essencePerMob = parseFloat(document.getElementById('mob-type').value);
            const mobsPerMinute = parseFloat(document.getElementById('mobs-per-minute').value);
            const powerConsumption = parseFloat(document.getElementById('mob-grinder-tier').value);

            const essencePerMinute = essencePerMob * mobsPerMinute;
            const essencePerHour = essencePerMinute * 60;
            const powerPerMob = powerConsumption * 20 * 3;
            const totalPowerPerMinute = powerPerMob * mobsPerMinute;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Essence Per Minute:</span>
                    <span class="result-value">${essencePerMinute.toLocaleString()} mB</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Essence Per Hour:</span>
                    <span class="result-value">${essencePerHour.toLocaleString()} mB</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Power Consumption:</span>
                    <span class="result-value">${powerConsumption.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Power Per Minute:</span>
                    <span class="result-value">${totalPowerPerMinute.toLocaleString()} RF</span>
                </div>
                <div class="info-box">
                    <strong>Tip:</strong> Use the essence for Mob Slaughter Factory to get pink slime and meat!
                </div>
            `;
        }
    },

    'if-crop': {
        title: '🌾 Industrial Foregoing Crop Farm Planner',
        description: 'Calculate crop harvester throughput and fertilizer usage.',
        render: () => `
            <div class="input-group">
                <label for="farm-area">Farm Area (blocks)</label>
                <input type="number" id="farm-area" value="81" min="1">
            </div>
            <div class="input-group">
                <label for="crop-growth-time">Crop Growth Time (seconds)</label>
                <input type="number" id="crop-growth-time" value="600" min="1">
            </div>
            <div class="input-group">
                <label for="use-fertilizer">Use Fertilizer?</label>
                <select id="use-fertilizer">
                    <option value="no">No</option>
                    <option value="yes">Yes (2x speed)</option>
                </select>
            </div>
            <button class="btn" onclick="calculateIFCrop()">Calculate</button>
            <div id="if-crop-results" class="results"></div>
        `,
        calculate: () => {
            const farmArea = parseInt(document.getElementById('farm-area').value);
            const growthTime = parseFloat(document.getElementById('crop-growth-time').value);
            const useFertilizer = document.getElementById('use-fertilizer').value === 'yes';

            const effectiveGrowthTime = useFertilizer ? growthTime / 2 : growthTime;
            const harvestsPerHour = (3600 / effectiveGrowthTime) * farmArea;
            const itemsPerHarvest = 2;
            const itemsPerHour = harvestsPerHour * itemsPerHarvest;

            const fertilizerPerGrowth = useFertilizer ? 10 : 0;
            const fertilizerPerHour = useFertilizer ? (3600 / effectiveGrowthTime) * farmArea * fertilizerPerGrowth : 0;

            return `
                <h3>Results</h3>
                <div class="result-item">
                    <span class="result-label">Farm Size:</span>
                    <span class="result-value">${farmArea} blocks</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Harvests Per Hour:</span>
                    <span class="result-value">${harvestsPerHour.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Items Per Hour:</span>
                    <span class="result-value">${itemsPerHour.toFixed(2)}</span>
                </div>
                ${useFertilizer ? `
                <div class="result-item">
                    <span class="result-label">Fertilizer Per Hour:</span>
                    <span class="result-value">${fertilizerPerHour.toFixed(2)} mB</span>
                </div>
                ` : ''}
                <div class="info-box ${useFertilizer ? 'success' : ''}">
                    <strong>Growth Time:</strong> ${effectiveGrowthTime.toFixed(2)} seconds per crop
                </div>
            `;
        }
    },

    'modpack-power': {
        title: '🔌 Power Grid Planner',
        description: 'Calculate total RF/t requirements and generator setup.',
        render: () => `
            <div class="input-group">
                <label>Add your machines (RF/t each):</label>
                <div id="machine-list"></div>
                <button class="btn" onclick="addMachineRow()" style="margin-top: 0.5rem;">+ Add Machine</button>
            </div>
            <div class="input-group">
                <label for="buffer-percentage">Buffer Percentage (%)</label>
                <input type="number" id="buffer-percentage" value="20" min="0" max="100">
            </div>
            <button class="btn" onclick="calculateModpackPower()">Calculate</button>
            <div id="modpack-power-results" class="results"></div>
        `,
        calculate: () => {
            const machines = document.querySelectorAll('.machine-power-input');
            let totalPower = 0;

            machines.forEach(input => {
                totalPower += parseFloat(input.value) || 0;
            });

            const bufferPercentage = parseFloat(document.getElementById('buffer-percentage').value) / 100;
            const bufferedPower = totalPower * (1 + bufferPercentage);

            const generators = [
                { name: 'Mekanism Wind Generator', output: 60 },
                { name: 'Thermal Stirling Dynamo', output: 40 },
                { name: 'Create Water Wheel', output: 512 },
                { name: 'Mekanism Gas-Burning Generator', output: 3600 },
                { name: 'Bigger Reactor (Small)', output: 100000 }
            ];

            let resultHTML = '<h3>Results</h3>';
            resultHTML += `
                <div class="result-item">
                    <span class="result-label">Total Power Required:</span>
                    <span class="result-value">${totalPower.toLocaleString()} RF/t</span>
                </div>
                <div class="result-item">
                    <span class="result-label">With ${(bufferPercentage * 100).toFixed(0)}% Buffer:</span>
                    <span class="result-value">${bufferedPower.toLocaleString()} RF/t</span>
                </div>
                <h4>Generator Options:</h4>
                <table class="result-table">
                    <tr>
                        <th>Generator Type</th>
                        <th>Quantity Needed</th>
                    </tr>
            `;

            generators.forEach(gen => {
                const needed = Math.ceil(bufferedPower / gen.output);
                resultHTML += `
                    <tr>
                        <td>${gen.name}</td>
                        <td>${needed.toLocaleString()}</td>
                    </tr>
                `;
            });

            resultHTML += '</table>';

            return resultHTML;
        }
    },

    'modpack-resource': {
        title: '💎 Resource Cost Calculator',
        description: 'Generate material shopping lists for complex builds.',
        render: () => `
            <div class="input-group">
                <label>Add resources needed:</label>
                <div id="resource-list"></div>
                <button class="btn" onclick="addResourceRow()" style="margin-top: 0.5rem;">+ Add Resource</button>
            </div>
            <button class="btn" onclick="calculateModpackResource()">Calculate Totals</button>
            <div id="modpack-resource-results" class="results"></div>
        `,
        calculate: () => {
            const resourceNames = document.querySelectorAll('.resource-name-input');
            const resourceAmounts = document.querySelectorAll('.resource-amount-input');

            let resultHTML = '<h3>Shopping List</h3>';
            resultHTML += '<table class="result-table"><tr><th>Resource</th><th>Amount</th><th>Stacks</th></tr>';

            let totalStacks = 0;

            for (let i = 0; i < resourceNames.length; i++) {
                const name = resourceNames[i].value || 'Unnamed Resource';
                const amount = parseFloat(resourceAmounts[i].value) || 0;
                const stacks = (amount / 64).toFixed(2);
                totalStacks += parseFloat(stacks);

                if (amount > 0) {
                    resultHTML += `
                        <tr>
                            <td>${name}</td>
                            <td>${amount.toLocaleString()}</td>
                            <td>${stacks}</td>
                        </tr>
                    `;
                }
            }

            resultHTML += `</table>
                <div class="result-item" style="margin-top: 1rem;">
                    <span class="result-label">Total Stacks Needed:</span>
                    <span class="result-value">${totalStacks.toFixed(2)}</span>
                </div>
                <div class="info-box">
                    <strong>Tip:</strong> This is approximately ${Math.ceil(totalStacks / 27)} chests worth of materials!
                </div>
            `;

            return resultHTML;
        }
    },

    'modpack-multiblock': {
        title: '🏗️ Multiblock Structure Planner',
        description: 'Calculate material requirements for multiblock structures.',
        render: () => `
            <div class="input-group">
                <label for="multiblock-type">Multiblock Type</label>
                <select id="multiblock-type">
                    <option value="mek-turbine">Mekanism Turbine (3x3x5)</option>
                    <option value="mek-boiler">Mekanism Boiler (3x3x4)</option>
                    <option value="ie-coke">Immersive Engineering Coke Oven (3x3x3)</option>
                    <option value="ie-blast">Immersive Engineering Blast Furnace (3x3x3)</option>
                    <option value="bigger-reactor">Bigger Reactor (5x5x5)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="structure-scale">Size Multiplier</label>
                <input type="number" id="structure-scale" value="1" min="1" max="10">
            </div>
            <button class="btn" onclick="calculateModpackMultiblock()">Calculate</button>
            <div id="modpack-multiblock-results" class="results"></div>
        `,
        calculate: () => {
            const multiblockType = document.getElementById('multiblock-type').value;
            const scale = parseInt(document.getElementById('structure-scale').value);

            const structures = {
                'mek-turbine': {
                    name: 'Mekanism Industrial Turbine',
                    materials: {
                        'Turbine Casing': 34 * scale,
                        'Turbine Valve': 2,
                        'Turbine Vent': 4,
                        'Pressure Disperser': 10 * scale,
                        'Rotational Complex': 1,
                        'Saturating Condenser': 8 * scale
                    }
                },
                'mek-boiler': {
                    name: 'Mekanism Thermoelectric Boiler',
                    materials: {
                        'Boiler Casing': 30 * scale,
                        'Boiler Valve': 2,
                        'Superheating Element': 16 * scale,
                        'Pressure Disperser': 10 * scale
                    }
                },
                'ie-coke': {
                    name: 'Immersive Engineering Coke Oven',
                    materials: {
                        'Coke Oven Bricks': 27 * scale
                    }
                },
                'ie-blast': {
                    name: 'Immersive Engineering Blast Furnace',
                    materials: {
                        'Blast Furnace Bricks': 27 * scale
                    }
                },
                'bigger-reactor': {
                    name: 'Bigger Reactors Reactor',
                    materials: {
                        'Reactor Casing': 125 * scale,
                        'Reactor Controller': 1,
                        'Reactor Power Tap': 2,
                        'Reactor Access Port': 2,
                        'Fuel Rods': 16 * scale,
                        'Control Rods': 4 * scale
                    }
                }
            };

            const selected = structures[multiblockType];

            let resultHTML = `<h3>${selected.name}</h3>`;
            resultHTML += '<table class="result-table"><tr><th>Material</th><th>Quantity</th></tr>';

            for (const [material, amount] of Object.entries(selected.materials)) {
                resultHTML += `
                    <tr>
                        <td>${material}</td>
                        <td>${amount.toLocaleString()}</td>
                    </tr>
                `;
            }

            resultHTML += '</table>';

            if (scale > 1) {
                resultHTML += `
                    <div class="info-box success">
                        <strong>Note:</strong> Materials scaled by ${scale}x for larger structure.
                    </div>
                `;
            }

            return resultHTML;
        }
    }
};

// Helper functions for dynamic rows
window.addMachineRow = function() {
    const machineList = document.getElementById('machine-list');
    const row = document.createElement('div');
    row.className = 'input-row';
    row.style.marginBottom = '0.5rem';
    row.innerHTML = `
        <input type="number" class="machine-power-input" placeholder="RF/t" min="0" style="width: 100%;">
    `;
    machineList.appendChild(row);
};

window.addResourceRow = function() {
    const resourceList = document.getElementById('resource-list');
    const row = document.createElement('div');
    row.className = 'input-row';
    row.style.marginBottom = '0.5rem';
    row.innerHTML = `
        <input type="text" class="resource-name-input" placeholder="Resource name" style="width: 60%;">
        <input type="number" class="resource-amount-input" placeholder="Amount" min="0" style="width: 38%;">
    `;
    resourceList.appendChild(row);
};

// Initialize dynamic lists if needed
function initializeDynamicLists() {
    if (document.getElementById('machine-list')) {
        addMachineRow();
        addMachineRow();
        addMachineRow();
    }
    if (document.getElementById('resource-list')) {
        addResourceRow();
        addResourceRow();
        addResourceRow();
    }
}

// Global calculate functions
window.calculateFission = () => displayResult('fission', calculators['mekanism-fission'].calculate());
window.calculateFusion = () => displayResult('fusion', calculators['mekanism-fusion'].calculate());
window.calculateProcessing = () => displayResult('processing', calculators['mekanism-processing'].calculate());
window.calculateChemical = () => displayResult('chemical', calculators['mekanism-chemical'].calculate());
window.calculatePower = () => displayResult('power', calculators['mekanism-power'].calculate());
window.calculateStress = () => displayResult('stress', calculators['create-stress'].calculate());
window.calculateThroughput = () => displayResult('throughput', calculators['create-throughput'].calculate());
window.calculateAssembly = () => displayResult('assembly', calculators['create-assembly'].calculate());
window.calculateDynamo = () => displayResult('dynamo', calculators['thermal-dynamo'].calculate());
window.calculateThermalProcessing = () => displayResult('thermal-processing', calculators['thermal-processing'].calculate());
window.calculateAE2Storage = () => displayResult('ae2-storage', calculators['ae2-storage'].calculate());
window.calculateAE2Channels = () => displayResult('ae2-channel', calculators['ae2-channel'].calculate());
window.calculateAE2Crafting = () => displayResult('ae2-crafting', calculators['ae2-crafting'].calculate());
window.calculateBotaniaMana = () => displayResult('botania-mana', calculators['botania-mana'].calculate());
window.calculateBotaniaSpreader = () => displayResult('botania-spreader', calculators['botania-spreader'].calculate());
window.calculateIFMob = () => displayResult('if-mob', calculators['if-mob'].calculate());
window.calculateIFCrop = () => displayResult('if-crop', calculators['if-crop'].calculate());
window.calculateModpackPower = () => displayResult('modpack-power', calculators['modpack-power'].calculate());
window.calculateModpackResource = () => displayResult('modpack-resource', calculators['modpack-resource'].calculate());
window.calculateModpackMultiblock = () => displayResult('modpack-multiblock', calculators['modpack-multiblock'].calculate());

function displayResult(type, html) {
    const resultDiv = document.getElementById(`${type}-results`);
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// Modal functions
function openModal(calculatorId) {
    const calculator = calculators[calculatorId];
    if (!calculator) return;

    modalBody.innerHTML = `
        <div class="calculator">
            <h2>${calculator.title}</h2>
            <div class="calc-description">${calculator.description}</div>
            ${calculator.render()}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(initializeDynamicLists, 100);
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
document.querySelectorAll('.calc-card').forEach(card => {
    card.addEventListener('click', () => {
        const calculatorId = card.getAttribute('data-calculator');
        openModal(calculatorId);
    });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
