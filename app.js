/**
 * CIRCUITR - Hardware Lab Project Hub
 * Robust Local-First Hardware Portfolio & Documentation App
 */

// Global State
let projects = [];
let currentSection = 'projects'; // 'projects' | 'components' | 'modules'
let activeCategory = 'All';
let currentSearchQuery = '';
let currentSort = 'newest';
let viewingProjectId = null;

// Temporary staging in the modal
let modalPhotos = [];
let modalBom = [];
let modalCodeSnippets = [];
let modalWorkflowSteps = [];

// Sample Seed Data for Instant Exploration
const SEED_PROJECTS = [
  {
    "id": "proj_esp32_ble_oled",
    "section": "projects",
    "title": "ESP32 Bluetooth Serial (SPP/BLE) with 0.96\" I2C OLED & Terminal Controller",
    "tagline": "Wireless bidirectional serial controller communicating between an Android Bluetooth terminal app and ESP32 with live SSD1306 display readout and hardware control.",
    "category": "Embedded Systems",
    "status": "Completed",
    "mcu": "ESP32-WROOM-32 (30-Pin DevKit)",
    "date": "2026-11-12",
    "tags": [
      "ESP32",
      "Bluetooth",
      "BLE",
      "OLED",
      "SSD1306",
      "I2C",
      "Android Terminal",
      "C++"
    ],
    "description": "A responsive wireless control and telemetry system built around the ESP32 microcontroller using Bluetooth Classic SPP / BLE Serial.\n\nKey Capabilities:\n- Establishes robust 2.4 GHz wireless RF pairing with an Android Serial Bluetooth Terminal application.\n- Real-time display on a 0.96\" monochrome 128x64 I2C OLED display (SSD1306 driver), showing live Bluetooth connection status, received strings (e.g., personalized text like \"sayan\", \"dipan roy\"), and system state.\n- Interactive hardware actuation: toggles onboard and breadboard status indicator LEDs in response to incoming terminal commands.\n- Hardware push-button interface wired with debounced digital inputs for local command dispatch back to the smartphone terminal console.",
    "photos": [
      "assets/images/esp32-ble-oled-terminal-overview.jpg",
      "assets/images/esp32-ble-oled-display-dipanroy.jpg",
      "assets/images/esp32-ble-oled-display-sayan.jpg",
      "assets/images/esp32-ble-mobile-app-terminal.jpg",
      "assets/images/esp32-ble-ide-setup.jpg"
    ],
    "bom": [
      {
        "name": "ESP32 DevKit V1 (30-Pin)",
        "qty": 1,
        "ref": "MCU1",
        "link": ""
      },
      {
        "name": "0.96\" I2C Monochrome OLED Display (128x64 SSD1306)",
        "qty": 1,
        "ref": "DISP1",
        "link": ""
      },
      {
        "name": "Solderless Breadboard (830 Point)",
        "qty": 1,
        "ref": "BB1",
        "link": ""
      },
      {
        "name": "Diffused 5mm Amber/Yellow LED",
        "qty": 1,
        "ref": "LED1",
        "link": ""
      },
      {
        "name": "Tactile Push Buttons (6x6mm)",
        "qty": 3,
        "ref": "SW1-SW3",
        "link": ""
      },
      {
        "name": "Current Limiting Resistors (220 Ohm, 10k Ohm)",
        "qty": 4,
        "ref": "R1-R4",
        "link": ""
      },
      {
        "name": "Dupont Jumper Wires (Male-to-Male, Male-to-Female)",
        "qty": 15,
        "ref": "W1",
        "link": ""
      }
    ],
    "githubUrl": "https://github.com/dipanr705-12/lets-explore-of-my-little-hardware-world",
    "cadUrl": "",
    "codeSnippets": [
      {
        "fileName": "esp32_bluetooth_oled.ino",
        "language": "arduino",
        "code": "#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\n#include \"BluetoothSerial.h\"\n\n#define SCREEN_WIDTH 128\n#define SCREEN_HEIGHT 64\n#define OLED_RESET -1\nAdafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);\n\nBluetoothSerial SerialBT;\nconst int ledPin = 2; // Indicator LED\nString incomingMessage = \"\";\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(ledPin, OUTPUT);\n  \n  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {\n    Serial.println(F(\"SSD1306 allocation failed\"));\n    for(;;);\n  }\n  \n  display.clearDisplay();\n  display.setTextColor(WHITE);\n  display.setTextSize(1);\n  display.setCursor(0, 4);\n  display.println(\"ESP32 SPP\");\n  display.println(\"Bluetooth: ON\");\n  display.println(\"Waiting for peer...\");\n  display.display();\n\n  SerialBT.begin(\"ESP32-BLE-Button\");\n  Serial.println(\"Bluetooth Started! Ready to pair.\");\n}\n\nvoid loop() {\n  if (SerialBT.available()) {\n    char c = SerialBT.read();\n    if (c == '\\n' || c == '\\r') {\n      if (incomingMessage.length() > 0) {\n        display.clearDisplay();\n        display.setCursor(0, 4);\n        display.println(\"ESP32 SPP\");\n        display.println(\"Bluetooth: ON\");\n        display.println(\"-----------------\");\n        display.setTextSize(2);\n        display.println(incomingMessage);\n        display.display();\n        \n        if (incomingMessage == \"ON\") digitalWrite(ledPin, HIGH);\n        else if (incomingMessage == \"OFF\") digitalWrite(ledPin, LOW);\n        \n        SerialBT.print(\"Echo: \");\n        SerialBT.println(incomingMessage);\n        incomingMessage = \"\";\n      }\n    } else {\n      incomingMessage += c;\n    }\n  }\n}"
      }
    ],
    "workflow": [
      {
        "title": "I2C Bus & OLED Wiring",
        "description": "Connected SSD1306 OLED SDA pin to ESP32 GPIO 21 and SCL pin to GPIO 22. Verified I2C address 0x3C via scan sketch.",
        "image": "assets/images/esp32-ble-oled-terminal-overview.jpg"
      },
      {
        "title": "Bluetooth Serial Protocol Setup",
        "description": "Initialized BluetoothSerial library configuring ESP32 as SPP slave \"ESP32-BLE-Button\". Paired successfully with Android smartphone serial console.",
        "image": "assets/images/esp32-ble-mobile-app-terminal.jpg"
      },
      {
        "title": "Bidirectional Command Testing",
        "description": "Sent custom string commands like \"sayan\" and \"dipan roy\" from phone app terminal; confirmed low-latency display update on OLED screen and LED state switching.",
        "image": "assets/images/esp32-ble-oled-display-dipanroy.jpg"
      }
    ]
  },
  {
    "id": "proj_diy_2wd_robot_car",
    "section": "projects",
    "title": "DIY 2-Wheel Drive Smart Robot Car with Custom Enclosure & Dual 18650 Supply",
    "tagline": "Custom-fabricated 2WD mobile robotics platform with dual yellow DC gearmotors, high-capacity 18650 Li-ion battery pack, and modular motor driver.",
    "category": "Robotics",
    "status": "Completed",
    "mcu": "Arduino / ESP32 Controller",
    "date": "2026-11-10",
    "tags": [
      "Robotics",
      "2WD Robot",
      "BO Motors",
      "18650 Li-ion",
      "Motor Driver",
      "Custom Chassis",
      "Arduino",
      "DIY"
    ],
    "description": "A custom-fabricated two-wheel-drive mobile robotics platform engineered for obstacle traversal, wireless remote navigation, and automated movement routines.\n\nKey Design Highlights:\n- Lightweight box chassis custom folded and reinforced to house internal microcontrollers, motor drivers, and cable harnesses securely.\n- Powered by two high-torque yellow BO (battery-operated) DC gear motors mated with rubberized traction wheels.\n- Onboard dual 18650 rechargeable Li-ion battery pack delivering stable DC voltage with external charging connector port and power switch.\n- Integrated motor driver breakout module wired for bidirectional differential steering (forward, reverse, spin-left, spin-right).",
    "photos": [
      "assets/images/diy-robot-car-chassis-top.jpg",
      "assets/images/diy-robot-car-driver-wiring.jpg",
      "assets/images/diy-robot-car-battery-mount.jpg"
    ],
    "bom": [
      {
        "name": "Yellow BO Dual Shaft DC Gearmotors",
        "qty": 2,
        "ref": "M1, M2",
        "link": ""
      },
      {
        "name": "Rubber Tread Wheels (65mm)",
        "qty": 2,
        "ref": "W1, W2",
        "link": ""
      },
      {
        "name": "Motor Driver Breakout Board (L298N / Mini)",
        "qty": 1,
        "ref": "DRV1",
        "link": ""
      },
      {
        "name": "18650 3.7V Rechargeable Li-ion Batteries",
        "qty": 2,
        "ref": "BAT1, BAT2",
        "link": ""
      },
      {
        "name": "Dual 18650 Battery Holder with Leads",
        "qty": 1,
        "ref": "HOLD1",
        "link": ""
      },
      {
        "name": "Heavy-Duty Cardboard/Polymer Monocoque Chassis",
        "qty": 1,
        "ref": "CHAS1",
        "link": ""
      },
      {
        "name": "Dupont Connection Harness",
        "qty": 12,
        "ref": "WIRE1",
        "link": ""
      }
    ],
    "githubUrl": "https://github.com/dipanr705-12/lets-explore-of-my-little-hardware-world",
    "cadUrl": "",
    "codeSnippets": [
      {
        "fileName": "differential_drive.ino",
        "language": "arduino",
        "code": "// Motor Driver Pin Definitions\nconst int IN1 = 12;\nconst int IN2 = 14;\nconst int IN3 = 27;\nconst int IN4 = 26;\n\nvoid setup() {\n  pinMode(IN1, OUTPUT);\n  pinMode(IN2, OUTPUT);\n  pinMode(IN3, OUTPUT);\n  pinMode(IN4, OUTPUT);\n}\n\nvoid forward() {\n  digitalWrite(IN1, HIGH);\n  digitalWrite(IN2, LOW);\n  digitalWrite(IN3, HIGH);\n  digitalWrite(IN4, LOW);\n}\n\nvoid stopBot() {\n  digitalWrite(IN1, LOW);\n  digitalWrite(IN2, LOW);\n  digitalWrite(IN3, LOW);\n  digitalWrite(IN4, LOW);\n}\n\nvoid loop() {\n  forward();\n  delay(2000);\n  stopBot();\n  delay(1000);\n}"
      }
    ],
    "workflow": [
      {
        "title": "Chassis Cutting & Wheel Alignment",
        "description": "Constructed the lightweight rigid body shell, aligned the dual BO motors parallel, and fastened them securely to ensure straight tracking.",
        "image": "assets/images/diy-robot-car-chassis-top.jpg"
      },
      {
        "title": "Motor Driver & Wire Harness Routing",
        "description": "Positioned the screw-terminal motor driver inside the chassis. Routed power and control logic wiring neatly to prevent mechanical snags.",
        "image": "assets/images/diy-robot-car-driver-wiring.jpg"
      },
      {
        "title": "Power Source & Li-ion Battery Integration",
        "description": "Installed the dual 18650 battery compartment on the rear chassis, providing 7.4V nominal voltage through inline protection and charging leads.",
        "image": "assets/images/diy-robot-car-battery-mount.jpg"
      }
    ]
  },
  {
    "id": "proj_blynk_distance_meter",
    "section": "projects",
    "title": "IoT Ultrasonic Distance Meter with Blynk Cloud Web Dashboard",
    "tagline": "Wi-Fi enabled real-time contactless distance measurement node using HC-SR04, NodeMCU/ESP, and Blynk Cloud telemetry gauge.",
    "category": "IoT & Sensors",
    "status": "Completed",
    "mcu": "ESP8266 / NodeMCU ESP32",
    "date": "2026-11-08",
    "tags": [
      "IoT",
      "Blynk",
      "Ultrasonic",
      "HC-SR04",
      "Cloud Telemetry",
      "ESP8266",
      "ESP32",
      "Wi-Fi"
    ],
    "description": "A smart Internet-of-Things ultrasonic rangefinder communicating real-time distance measurements to a cloud dashboard.\n\nFeatures & Implementation:\n- HC-SR04 ultrasonic transducer module sends 40kHz sonic bursts to gauge proximity and distance with millimeter accuracy.\n- Wi-Fi SoC connects to local WLAN and streams sensor readings every 250ms to Blynk Cloud (Blynk Console).\n- Interactive Blynk Cloud web dashboard featuring a dynamic gauge widget showing instantaneous distance up to 400 cm.\n- Powered independently by a portable high-capacity 18650 Li-ion cylindrical cell with direct voltage regulation.",
    "photos": [
      "assets/images/blynk-ultrasonic-meter.jpg"
    ],
    "bom": [
      {
        "name": "HC-SR04 Ultrasonic Sonar Sensor",
        "qty": 1,
        "ref": "SEN1",
        "link": ""
      },
      {
        "name": "ESP8266 / ESP32 NodeMCU Board",
        "qty": 1,
        "ref": "U1",
        "link": ""
      },
      {
        "name": "18650 3.7V Li-ion Battery",
        "qty": 1,
        "ref": "BAT1",
        "link": ""
      },
      {
        "name": "Mini Solderless Breadboard",
        "qty": 1,
        "ref": "BB1",
        "link": ""
      },
      {
        "name": "Jumper Wire Set",
        "qty": 6,
        "ref": "W1",
        "link": ""
      }
    ],
    "githubUrl": "https://github.com/dipanr705-12/lets-explore-of-my-little-hardware-world",
    "cadUrl": "",
    "codeSnippets": [
      {
        "fileName": "blynk_distance_meter.ino",
        "language": "arduino",
        "code": "#define BLYNK_TEMPLATE_ID \"TMPLxxxxxx\"\n#define BLYNK_TEMPLATE_NAME \"distance meter\"\n#define BLYNK_AUTH_TOKEN \"YourAuthToken\"\n\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n\nchar auth[] = BLYNK_AUTH_TOKEN;\nchar ssid[] = \"YourWiFiNetwork\";\nchar pass[] = \"YourWiFiPassword\";\n\nconst int trigPin = D5;\nconst int echoPin = D6;\n\nBlynkTimer timer;\n\nvoid sendDistance() {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  \n  long duration = pulseIn(echoPin, HIGH);\n  float distanceCm = duration * 0.034 / 2;\n  \n  if (distanceCm > 0 && distanceCm <= 400) {\n    Blynk.virtualWrite(V1, distanceCm);\n    Serial.print(\"Measured: \");\n    Serial.print(distanceCm);\n    Serial.println(\" cm\");\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n  \n  Blynk.begin(auth, ssid, pass);\n  timer.setInterval(500L, sendDistance);\n}\n\nvoid loop() {\n  Blynk.run();\n  timer.run();\n}"
      }
    ],
    "workflow": [
      {
        "title": "HC-SR04 Transducer Setup & Pulse Timing",
        "description": "Wired trigger and echo lines with level conditioning, calibrated time-of-flight acoustic sound calculation speed formula.",
        "image": "assets/images/blynk-ultrasonic-meter.jpg"
      },
      {
        "title": "Blynk IoT Cloud Datastream & Gauge Configuration",
        "description": "Created Virtual Pin V1 Datastream (0-400 range, integer/float). Added gauge widget in Blynk Web Console with auto-scaling needle.",
        "image": "assets/images/blynk-ultrasonic-meter.jpg"
      }
    ]
  },
  {
    "id": "comp_arduino_uno_r3",
    "section": "components",
    "title": "Arduino Uno R3 Microcontroller Board (ATmega328P)",
    "tagline": "Standard 8-bit AVR development board with 14 digital I/O pins, 6 PWM channels, and 6 analog inputs.",
    "category": "Microcontrollers & ICs",
    "status": "Completed",
    "mcu": "ATmega328P (16 MHz Crystal)",
    "date": "2026-11-12",
    "tags": [
      "Arduino",
      "Uno",
      "ATmega328P",
      "AVR",
      "GPIO",
      "ADC",
      "PWM",
      "UART"
    ],
    "description": "The flagship Arduino Uno R3 development board powered by the Microchip ATmega328P 8-bit RISC microcontroller.\n\nKey Specifications:\n- Operating Voltage: 5V DC (Input 7-12V via Barrel Jack or USB Type-B)\n- Clock Speed: 16 MHz Quartz Crystal Oscillator\n- Flash Memory: 32 KB (0.5 KB used by bootloader)\n- SRAM: 2 KB, EEPROM: 1 KB\n- Digital I/O Pins: 14 (of which 6 provide PWM output: D3, D5, D6, D9, D10, D11)\n- Analog Input Pins: 6 (10-bit resolution ADC channels A0-A5)\n- Standard ICSP header for direct ISP in-circuit serial programming.",
    "photos": [
      "assets/images/comp-arduino-uno-r3.jpg"
    ],
    "bom": [
      {
        "name": "Arduino Uno R3 Board",
        "qty": 1,
        "ref": "DEV1",
        "link": ""
      },
      {
        "name": "USB Type-A to Type-B Cable",
        "qty": 1,
        "ref": "CAB1",
        "link": ""
      }
    ],
    "githubUrl": "https://github.com/dipanr705-12/lets-explore-of-my-little-hardware-world",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_esp32_devkit_oled",
    "section": "components",
    "title": "ESP32-WROOM-32 30-Pin DevKit & I2C OLED Hardware Pair",
    "tagline": "Dual-core 240MHz Wi-Fi + BLE IoT development board paired with compact 0.96\" SSD1306 graphic display.",
    "category": "Microcontrollers & ICs",
    "status": "Completed",
    "mcu": "ESP32-WROOM-32 (Xtensa Dual-Core)",
    "date": "2026-11-12",
    "tags": [
      "ESP32",
      "Wi-Fi",
      "Bluetooth",
      "BLE",
      "OLED",
      "SSD1306",
      "I2C",
      "IoT"
    ],
    "description": "High performance IoT microcontroller paired directly with a miniature display interface for telemetry and edge computation.\n\nCore Capabilities:\n- Tensilica Xtensa Dual-Core 32-bit LX6 microprocessor running up to 240 MHz.\n- Integrated 802.11 b/g/n Wi-Fi baseband and dual-mode Bluetooth (Classic + BLE).\n- 520 KB SRAM with 4MB SPI Flash memory.\n- Paired with 0.96\" monochrome I2C OLED display (128x64 pixels) on GPIO 21 (SDA) and GPIO 22 (SCL).\n- Perfect for wearable devices, smart sensors, and local status dashboards.",
    "photos": [
      "assets/images/comp-esp32-devkit-oled-combo.jpg",
      "assets/images/comp-ssd1306-oled-display.jpg"
    ],
    "bom": [
      {
        "name": "ESP32 30-Pin DevKit V1",
        "qty": 1,
        "ref": "U1",
        "link": ""
      },
      {
        "name": "0.96\" SSD1306 OLED Display (4-Pin I2C)",
        "qty": 1,
        "ref": "DISP1",
        "link": ""
      }
    ],
    "githubUrl": "https://github.com/dipanr705-12/lets-explore-of-my-little-hardware-world",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_l298n_driver",
    "section": "components",
    "title": "L298N Dual Full-Bridge High-Power DC & Stepper Motor Driver",
    "tagline": "Heavy-duty dual H-bridge driver module equipped with extruded aluminum heatsink and 5V step-down regulator.",
    "category": "Power & Motor Drivers",
    "status": "Completed",
    "mcu": "5V TTL Logic Level Compatible",
    "date": "2026-11-12",
    "tags": [
      "L298N",
      "Motor Driver",
      "H-Bridge",
      "Robotics",
      "DC Motors",
      "Stepper",
      "Heatsink"
    ],
    "description": "The industry workhorse L298N dual full-bridge motor driver module designed to drive inductive loads such as DC gear motors, stepper motors, and solenoids.\n\nKey Specifications:\n- Driver Chip: L298N Dual H-Bridge IC\n- Motor Drive Voltage (Vs): +5V to +35V DC\n- Peak Output Current: 2A per channel (with thermal dissipation)\n- Onboard 78M05 5V linear voltage regulator for logic rail supply with jumper enable\n- Heavy-duty extruded black aluminum heatsink for heat dissipation under continuous heavy load.\n- Screw terminal blocks for high-current battery power input and motor outputs OUT1-OUT4.",
    "photos": [
      "assets/images/comp-l298n-dual-motor-driver.jpg"
    ],
    "bom": [
      {
        "name": "L298N Dual Motor Driver Board",
        "qty": 1,
        "ref": "MOD1",
        "link": ""
      },
      {
        "name": "Aluminum Heatsink & Mounting Hardware",
        "qty": 1,
        "ref": "HS1",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_l293d_module",
    "section": "components",
    "title": "L293D Dual H-Bridge Motor Driver Module with Status LEDs",
    "tagline": "Compact DIP-16 motor driver board with indicator LEDs, dual terminal blocks, and logic control headers.",
    "category": "Power & Motor Drivers",
    "status": "Completed",
    "mcu": "Logic: 5V / Motor: Up to 36V",
    "date": "2026-11-12",
    "tags": [
      "L293D",
      "Motor Driver",
      "H-Bridge",
      "Robotics",
      "DIP-16",
      "Indicator LEDs"
    ],
    "description": "A compact and reliable dual motor controller built around the classic L293D monolithic integrated push-pull driver IC.\n\nFeatures:\n- Dual channel H-bridge architecture delivering up to 600mA continuous current per channel (1.2A peak).\n- Internal clamp diodes for back-EMF protection against inductive voltage spikes.\n- Onboard dual color status indicator LEDs (+12V rail Green LED and +5V rail Red LED).\n- Dual green screw terminal blocks for motor phase wiring and dedicated pin headers for directional logic control (M1.a, M1.b, M2.a, M2.b).",
    "photos": [
      "assets/images/comp-l293d-motor-driver-module.jpg"
    ],
    "bom": [
      {
        "name": "L293D Dual Motor Driver Breakout Board",
        "qty": 1,
        "ref": "MOD1",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_bo_gearmotor_wheel",
    "section": "components",
    "title": "Yellow Dual-Shaft BO DC Gearmotors with Rubber Tread Wheels",
    "tagline": "High-torque 3-6V DC gearbox motors with dual drive shafts and 65mm rubber grip tires for mobile robotics.",
    "category": "Power & Motor Drivers",
    "status": "Completed",
    "mcu": "3V - 6V DC Voltage Supply",
    "date": "2026-11-12",
    "tags": [
      "BO Motor",
      "Gearbox",
      "Robotics",
      "Wheels",
      "Actuators",
      "DC Motor",
      "2WD Car"
    ],
    "description": "Standard yellow plastic geared hobby DC motors widely utilized in line-followers, obstacle avoidance cars, and differential drive robotics platforms.\n\nSpecifications:\n- Operating Voltage: 3V to 6V DC (recommended 4.5V - 6V)\n- Reduction Ratio: 1:48 internal spur gearbox\n- Dual straight output shafts allowing wheel mounting on one side and optical encoder disc on the other\n- Includes 65mm diameter rubber tread tires offering excellent grip and traction on smooth surfaces.",
    "photos": [
      "assets/images/comp-bo-gearmotors-wheels.jpg"
    ],
    "bom": [
      {
        "name": "Yellow BO Dual-Shaft DC Gearmotor",
        "qty": 2,
        "ref": "M1, M2",
        "link": ""
      },
      {
        "name": "65mm Rubber Grip Wheels",
        "qty": 2,
        "ref": "W1, W2",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_hc_sr04_sensor",
    "section": "components",
    "title": "HC-SR04 Ultrasonic Distance Sensor Transducer Module",
    "tagline": "Contactless acoustic sonar rangefinder with 2cm to 400cm detection range and 3mm resolution.",
    "category": "Sensors & Transducers",
    "status": "Completed",
    "mcu": "5V TTL Trigger / Echo Pulse",
    "date": "2026-11-12",
    "tags": [
      "HC-SR04",
      "Ultrasonic",
      "Sonar",
      "Sensors",
      "Rangefinder",
      "Distance Meter",
      "Transducer"
    ],
    "description": "The HC-SR04 module provides 2cm to 400cm non-contact distance measurement with accuracy up to 3mm.\n\nHow It Operates:\n- Includes ultrasonic transmitter, receiver, and control circuit on a compact dual-can PCB.\n- Host controller sends a 10 microsecond HIGH pulse on the TRIG pin.\n- Transducer automatically emits eight 40 kHz ultrasound sound pulses and awaits echo reflection.\n- ECHO output pin remains HIGH for duration of acoustic round-trip flight: Distance = (Echo High Time * 340 m/s) / 2.",
    "photos": [
      "assets/images/comp-hc-sr04-ultrasonic.jpg"
    ],
    "bom": [
      {
        "name": "HC-SR04 Ultrasonic Sensor Module",
        "qty": 1,
        "ref": "SEN1",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_mb102_power_supply",
    "section": "components",
    "title": "MB102 Solderless Breadboard Power Supply Module (3.3V / 5V)",
    "tagline": "Dual-rail plug-in breadboard power module with DC barrel jack, USB output, and selectable voltage jumpers.",
    "category": "Power & Motor Drivers",
    "status": "Completed",
    "mcu": "Input: 6.5V - 12V DC / Output: 3.3V, 5V",
    "date": "2026-11-12",
    "tags": [
      "MB102",
      "Power Supply",
      "Breadboard",
      "Voltage Regulator",
      "AMS1117",
      "3.3V",
      "5V"
    ],
    "description": "A convenient plug-in power supply adapter engineered to snap directly onto standard 830-point and 400-point solderless breadboard power buses.\n\nKey Features:\n- Dual independent rail control: configure left and right breadboard power rails independently to 0V, 3.3V, or 5V using onboard jumpers.\n- Input Voltage: 6.5V - 12V via 2.1mm DC barrel jack or USB power input.\n- Dual AMS1117 low-dropout linear regulators providing clean, ripple-suppressed DC current up to 700mA.\n- On/Off mechanical latching push switch with green power indicator LED.",
    "photos": [
      "assets/images/comp-mb102-breadboard-power-supply.jpg"
    ],
    "bom": [
      {
        "name": "MB102 Breadboard Power Supply Board",
        "qty": 1,
        "ref": "PSU1",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  },
  {
    "id": "comp_ssd1306_oled",
    "section": "components",
    "title": "0.96\" I2C Monochrome Graphic OLED Display (128x64 SSD1306)",
    "tagline": "High-contrast self-illuminating graphical display module requiring only two I2C communication wires.",
    "category": "Sensors & Transducers",
    "status": "Completed",
    "mcu": "I2C Interface (Address 0x3C)",
    "date": "2026-11-12",
    "tags": [
      "OLED",
      "SSD1306",
      "I2C",
      "128x64",
      "Display",
      "Monochrome",
      "Wearables"
    ],
    "description": "A vivid 0.96-inch OLED screen driven by the SSD1306 controller IC. Because OLED pixels emit their own light without requiring a backlight, it offers deep true blacks and wide viewing angles (>160 degrees) while consuming minimal power.\n\nPinout:\n- GND: Ground\n- VCC: 3.3V - 5V Power Supply\n- SCL: I2C Clock\n- SDA: I2C Data",
    "photos": [
      "assets/images/comp-ssd1306-oled-display.jpg"
    ],
    "bom": [
      {
        "name": "0.96\" I2C SSD1306 OLED Display Module",
        "qty": 1,
        "ref": "DISP1",
        "link": ""
      }
    ],
    "githubUrl": "",
    "cadUrl": "",
    "codeSnippets": [],
    "workflow": []
  }
];

// Initialize Storage (LocalStorage with fallback)
function initStorage() {
  try {
    const CURRENT_STORAGE_VERSION = "v6_real_components_lab_photos";
    const currentVersion = localStorage.getItem("circuitr_version");
    if (currentVersion !== CURRENT_STORAGE_VERSION) {
      // Overwrite previous stale sample projects so real projects show up immediately
      projects = [...SEED_PROJECTS];
      localStorage.setItem("circuitr_version", CURRENT_STORAGE_VERSION);
      saveProjects();
    } else {
      const saved = localStorage.getItem("circuitr_projects");
      projects = saved ? JSON.parse(saved) : [...SEED_PROJECTS];
    }
  } catch (err) {
    console.warn("LocalStorage error, fallback to seeds:", err);
    projects = [...SEED_PROJECTS];
  }
}

function saveProjects() {
  try {
    localStorage.setItem('circuitr_projects', JSON.stringify(projects));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Local storage quota limit reached! Try reducing image file sizes or remove large photos.');
    }
    console.error('Storage error:', e);
  }
}

// Categories definitions
const SECTION_CATEGORIES = {
  projects: ['All', 'Robotics', 'IoT & Sensors', 'PCB & Circuits', 'Embedded Systems', 'Wearables & Audio', '3D Printing & Enclosures', 'FPGA & High Speed'],
  components: ['All', 'Microcontrollers & ICs', 'Sensors & Transducers', 'Power & Motor Drivers', 'Passives & Diodes', 'Connectors & Switches'],
  modules: ['All', 'Wireless & RF Modules', 'Display & Audio Modules', 'Motor Drivers & Actuators', 'Power & Charging Modules', 'Interface & Shields']
};

function getActiveCategoryList() {
  return SECTION_CATEGORIES[currentSection] || SECTION_CATEGORIES.projects;
}

// DOM elements
const homeView = document.getElementById('homeView');
const detailView = document.getElementById('detailView');
const projectsGrid = document.getElementById('projectsGrid');
const emptyState = document.getElementById('emptyState');
const categoryFilterContainer = document.getElementById('categoryFilterContainer');
const searchInput = document.getElementById('searchInput');
const sortSelector = document.getElementById('sortSelector');
const statTotalProjects = document.getElementById('statTotalProjects');
const statTotalComponents = document.getElementById('statTotalComponents');
const statTotalModules = document.getElementById('statTotalModules');
const sectionViewTitle = document.getElementById('sectionViewTitle');
const formSectionType = document.getElementById('formSectionType');
const formTitleLabel = document.getElementById('formTitleLabel');
const statTotalWorkflows = document.getElementById('statTotalWorkflows');
const filteredCountBadge = document.getElementById('filteredCountBadge');

// Modal Elements
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const modalTitle = document.getElementById('modalTitle');
const editingProjectId = document.getElementById('editingProjectId');
const photoFileInput = document.getElementById('photoFileInput');
const dropZone = document.getElementById('dropZone');
const photosPreviewList = document.getElementById('photosPreviewList');
const bomTableBody = document.getElementById('bomTableBody');
const codeSnippetsContainer = document.getElementById('codeSnippetsContainer');
const workflowStepsContainer = document.getElementById('workflowStepsContainer');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  setupEventListeners();
  renderCategoryPills();
  renderProjects();
  updateStats();
  lucide.createIcons();
});

// Setup Events
function setupEventListeners() {
  // Navigation & Search
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.toLowerCase().trim();
    renderProjects();
  });

  sortSelector.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProjects();
  });

  // Modal open
  document.getElementById('btnNewProject').addEventListener('click', () => {
    openProjectModal();
  });

  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = tab.getAttribute('data-tab');
      switchModalTab(targetTab);
    });
  });

  // Drag and Drop photos
  dropZone.addEventListener('click', () => photoFileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-cyan-400', 'bg-cyan-950/20');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-cyan-400', 'bg-cyan-950/20');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-cyan-400', 'bg-cyan-950/20');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  });

  photoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesUpload(e.target.files);
    }
  });

  // Form submit
  projectForm.addEventListener('submit', handleFormSubmit);

  // Export / Import
  document.getElementById('btnExportData').addEventListener('click', exportDataJson);
  document.getElementById('importFileInput').addEventListener('change', handleImportFile);
}

// Category Pills

// Main Section Switcher: 1) Projects, 2) Components, 3) Modules
function switchMainTab(section) {
  currentSection = section;
  activeCategory = 'All';

  // Update Section Nav button styles
  const tabs = [
    { id: 'tabBtnProjects', navId: 'navTabProjects', sec: 'projects' },
    { id: 'tabBtnComponents', navId: 'navTabComponents', sec: 'components' },
    { id: 'tabBtnModules', navId: 'navTabModules', sec: 'modules' }
  ];

  tabs.forEach(t => {
    const btn = document.getElementById(t.id);
    const navBtn = document.getElementById(t.navId);
    const isActive = t.sec === section;

    if (btn) {
      if (isActive) {
        btn.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25';
      } else {
        btn.className = 'flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition';
      }
    }

    if (navBtn) {
      if (isActive) {
        navBtn.className = 'px-3 py-1.5 rounded-lg text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 transition';
      } else {
        navBtn.className = 'px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-hw-card transition';
      }
    }
  });

  // Update Section title and empty state text
  const titles = {
    projects: '1) Projects Portfolio & Systems',
    components: '2) Components (ICs, Sensors, Passives)',
    modules: '3) Modules & Breakout Boards'
  };
  if (sectionViewTitle) {
    sectionViewTitle.textContent = titles[section] || 'Hardware World';
  }

  const emptyStateTitles = {
    projects: 'No hardware projects found',
    components: 'No electronic components uploaded yet',
    modules: 'No hardware modules uploaded yet'
  };
  const emptyTitleElem = document.getElementById('emptyStateTitle');
  if (emptyTitleElem) emptyTitleElem.textContent = emptyStateTitles[section];

  const emptyBtnElem = document.getElementById('emptyStateBtnText');
  if (emptyBtnElem) {
    emptyBtnElem.textContent = section === 'projects' ? 'Upload First Project' : (section === 'components' ? 'Upload Component' : 'Upload Module');
  }

  renderCategoryPills();
  renderProjects();
}

function openCurrentSectionModal() {
  openProjectModal(currentSection);
}

function onSectionTypeChange(type) {
  if (formTitleLabel) {
    if (type === 'component') formTitleLabel.textContent = 'Component Name / Part Number *';
    else if (type === 'module') formTitleLabel.textContent = 'Module Name & Model *';
    else formTitleLabel.textContent = 'Project Title *';
  }
}

function renderCategoryPills() {
  categoryFilterContainer.innerHTML = getActiveCategoryList().map(cat => {
    const isActive = cat === activeCategory;
    const activeClasses = isActive
      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
      : 'bg-hw-card text-slate-300 hover:text-white hover:bg-slate-800 border border-hw-border';
    return `
      <button 
        onclick="selectCategory('${cat}')" 
        class="px-3.5 py-1.5 rounded-lg text-xs transition duration-150 ${activeClasses}"
      >
        ${cat}
      </button>
    `;
  }).join('');
}

function selectCategory(cat) {
  activeCategory = cat;
  renderCategoryPills();
  renderProjects();
}

// Filtering & Sorting
function getFilteredProjects() {
  return projects.filter(p => {
    const itemSection = p.section || 'projects';
    const matchesSection = itemSection === currentSection;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !currentSearchQuery || 
      p.title.toLowerCase().includes(currentSearchQuery) ||
      (p.tagline && p.tagline.toLowerCase().includes(currentSearchQuery)) ||
      (p.mcu && p.mcu.toLowerCase().includes(currentSearchQuery)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(currentSearchQuery))) ||
      (p.bom && p.bom.some(b => b.name.toLowerCase().includes(currentSearchQuery)));
    return matchesSection && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.date || 0) - new Date(a.date || 0);
    if (currentSort === 'oldest') return new Date(a.date || 0) - new Date(b.date || 0);
    if (currentSort === 'title') return a.title.localeCompare(b.title);
    return 0;
  });
}

// Render Project Grid
function renderProjects() {
  const filtered = getFilteredProjects();
  filteredCountBadge.textContent = `${filtered.length} of ${projects.length} projects`;

  if (filtered.length === 0) {
    projectsGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  projectsGrid.innerHTML = filtered.map(p => {
    const coverPhoto = (p.photos && p.photos.length > 0) 
      ? p.photos[0] 
      : '';

    const statusBadgeClass = getStatusBadgeClass(p.status);
    const tagsHtml = (p.tags || []).slice(0, 3).map(t => 
      `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-hw-bg/80 text-cyan-300 border border-cyan-900/60">${t}</span>`
    ).join('');

    const extraTagsCount = (p.tags && p.tags.length > 3) ? `<span class="text-[11px] text-slate-400">+${p.tags.length - 3}</span>` : '';

    return `
      <div class="project-card group bg-hw-card/90 border border-hw-border rounded-xl overflow-hidden flex flex-col cursor-pointer" onclick="viewProject('${p.id}')">
        <!-- Card Image Thumbnail -->
        <div class="relative h-48 w-full overflow-hidden bg-hw-surface">
          <img 
            src="${coverPhoto}" 
            alt="${p.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
            loading="lazy"
            onerror="this.src=''"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-hw-card via-transparent to-transparent opacity-80"></div>
          
          <div class="absolute top-3 left-3">
            <span class="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${statusBadgeClass}">
              ${p.status || 'Active'}
            </span>
          </div>

          <div class="absolute top-3 right-3 flex items-center space-x-1.5">
            ${p.photos && p.photos.length > 1 ? `
              <span class="text-[11px] bg-black/60 backdrop-blur-md text-slate-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <i data-lucide="camera" class="w-3 h-3"></i>
                <span>${p.photos.length}</span>
              </span>
            ` : ''}
            ${p.codeSnippets && p.codeSnippets.length > 0 ? `
              <span class="text-[11px] bg-cyan-950/80 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <i data-lucide="code" class="w-3 h-3"></i>
                <span>Code</span>
              </span>
            ` : ''}
          </div>

          ${p.mcu ? `
            <div class="absolute bottom-2 left-3">
              <span class="text-xs font-mono text-cyan-300 flex items-center space-x-1 drop-shadow-md">
                <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                <span>${p.mcu}</span>
              </span>
            </div>
          ` : ''}
        </div>

        <!-- Card Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-xs text-slate-400 font-medium mb-1">${p.category}</div>
            <h3 class="font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              ${p.title}
            </h3>
            <p class="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              ${p.tagline || p.description || 'Hardware project build details, code, and schematics.'}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-hw-border/60">
            <div class="flex flex-wrap items-center gap-1.5">
              ${tagsHtml}
              ${extraTagsCount}
            </div>

            <div class="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span class="flex items-center space-x-1">
                <i data-lucide="calendar" class="w-3 h-3"></i>
                <span>${p.date || 'Recent'}</span>
              </span>
              <span class="text-cyan-400 flex items-center space-x-1 font-medium group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Completed': return 'badge-completed';
    case 'Prototype': return 'badge-prototype';
    case 'In Progress': return 'badge-in-progress';
    default: return 'badge-archived';
  }
}

// Stats Calculation
function updateStats() {
  const projectCount = projects.filter(p => (p.section || 'projects') === 'projects').length;
  const componentCount = projects.filter(p => p.section === 'components').length;
  const moduleCount = projects.filter(p => p.section === 'modules').length;

  if (statTotalProjects) statTotalProjects.textContent = projectCount;
  if (statTotalComponents) statTotalComponents.textContent = componentCount;
  if (statTotalModules) statTotalModules.textContent = moduleCount;

  const countBadgeProj = document.getElementById('tabCountProjects');
  const countBadgeComp = document.getElementById('tabCountComponents');
  const countBadgeMod = document.getElementById('tabCountModules');

  if (countBadgeProj) countBadgeProj.textContent = projectCount;
  if (countBadgeComp) countBadgeComp.textContent = componentCount;
  if (countBadgeMod) countBadgeMod.textContent = moduleCount;
}

// Single Project View
function viewProject(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;
  viewingProjectId = id;

  homeView.classList.add('hidden');
  detailView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Detail Header Actions (Edit / Delete / Export Markdown)
  const detailHeaderActions = document.getElementById('detailHeaderActions');
  detailHeaderActions.innerHTML = `
    <button onclick="exportSingleProjectMarkdown('${p.id}')" class="px-3 py-1.5 rounded-lg bg-hw-card border border-hw-border hover:border-slate-500 text-xs text-slate-300 hover:text-white flex items-center space-x-1.5 transition">
      <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
      <span>Export README</span>
    </button>
    <button onclick="openProjectModal('${p.id}')" class="px-3 py-1.5 rounded-lg bg-hw-card border border-hw-border hover:border-cyan-400 text-xs text-cyan-400 flex items-center space-x-1.5 transition">
      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
      <span>Edit Project</span>
    </button>
    <button onclick="confirmDeleteProject('${p.id}')" class="px-3 py-1.5 rounded-lg bg-hw-card border border-hw-border hover:border-red-500 text-xs text-red-400 flex items-center space-x-1.5 transition">
      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      <span>Delete</span>
    </button>
  `;

  // Gallery Photos
  const photos = p.photos && p.photos.length > 0 
    ? p.photos 
    : [''];

  const photosGalleryHtml = photos.map((imgUrl, idx) => `
    <div class="relative group cursor-pointer overflow-hidden rounded-xl border border-hw-border bg-hw-surface h-48 md:h-64" onclick="openLightbox('${imgUrl}')">
      <img src="${imgUrl}" alt="Project photo ${idx + 1}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <span class="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
          <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i>
          <span>Click to Enlarge</span>
        </span>
      </div>
    </div>
  `).join('');

  // Bill of Materials Rows
  const bomRowsHtml = (p.bom && p.bom.length > 0)
    ? p.bom.map((b, i) => `
      <tr class="border-b border-hw-border/50 hover:bg-hw-card/40 transition">
        <td class="p-3 font-medium text-slate-200">${b.name || 'Component'}</td>
        <td class="p-3 text-cyan-400 font-mono">${b.qty || 1}</td>
        <td class="p-3 font-mono text-slate-400">${b.ref || '-'}</td>
        <td class="p-3">
          ${b.link ? `<a href="${b.link}" target="_blank" rel="noopener" class="text-cyan-400 hover:underline flex items-center space-x-1"><i data-lucide="external-link" class="w-3 h-3"></i><span>Datasheet / Buy</span></a>` : '<span class="text-slate-400">N/A</span>'}
        </td>
      </tr>
    `).join('')
    : `<tr><td colspan="4" class="p-4 text-center text-slate-400">No components added to the Bill of Materials.</td></tr>`;

  // Code Snippets Tabs & Viewer
  let codeSnippetsHtml = '';
  if (p.codeSnippets && p.codeSnippets.length > 0) {
    codeSnippetsHtml = `
      <div class="space-y-4">
        ${p.codeSnippets.map((snip, index) => `
          <div class="rounded-xl border border-hw-border overflow-hidden bg-hw-card">
            <div class="px-4 py-2.5 bg-hw-surface border-b border-hw-border flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <i data-lucide="file-code" class="w-4 h-4 text-cyan-400"></i>
                <span class="font-mono text-xs font-semibold text-slate-200">${snip.fileName || `snippet_${index + 1}`}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-hw-card border border-hw-border text-slate-400 uppercase font-mono">${snip.language || 'code'}</span>
              </div>
              <button onclick="copyCode(this, ${index})" class="text-xs text-slate-400 hover:text-cyan-400 px-2.5 py-1 rounded bg-hw-card border border-hw-border hover:border-cyan-400/50 flex items-center space-x-1 transition">
                <i data-lucide="copy" class="w-3 h-3"></i>
                <span>Copy</span>
              </button>
            </div>
            <pre class="overflow-x-auto"><code class="language-${snip.language || 'cpp'}">${escapeHtml(snip.code || '')}</code></pre>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    codeSnippetsHtml = `
      <div class="p-8 text-center border border-dashed border-hw-border rounded-xl bg-hw-surface/30 text-slate-400 text-xs">
        No code snippets uploaded for this project.
      </div>
    `;
  }

  // Workflow Build Log Steps
  let workflowStepsHtml = '';
  if (p.workflow && p.workflow.length > 0) {
    workflowStepsHtml = `
      <div class="relative pl-6 border-l-2 border-hw-border space-y-8 my-4 ml-2">
        ${p.workflow.map((step, idx) => `
          <div class="relative">
            <!-- Step Pin -->
            <div class="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shadow-lg shadow-cyan-500/30">
              ${idx + 1}
            </div>

            <div class="bg-hw-card/80 border border-hw-border rounded-xl p-5 hover:border-slate-500 transition">
              <h4 class="text-sm font-bold text-white flex items-center justify-between">
                <span>${step.title || `Phase ${idx + 1}`}</span>
              </h4>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed whitespace-pre-line">${step.description || ''}</p>
              ${step.image ? `
                <div class="mt-3 overflow-hidden rounded-lg border border-hw-border max-w-md cursor-pointer" onclick="openLightbox('${step.image}')">
                  <img src="${step.image}" alt="Step photo" class="w-full h-44 object-cover hover:scale-105 transition" loading="lazy">
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    workflowStepsHtml = `
      <div class="p-8 text-center border border-dashed border-hw-border rounded-xl bg-hw-surface/30 text-slate-400 text-xs">
        No workflow steps documented yet. Click "Edit Project" to add your fabrication timeline.
      </div>
    `;
  }

  // Tags pill
  const tagsHtml = (p.tags || []).map(t => 
    `<span class="text-xs font-mono px-2.5 py-1 rounded bg-hw-card border border-hw-border text-cyan-300">${t}</span>`
  ).join('');

  const detailContent = document.getElementById('detailContent');
  detailContent.innerHTML = `
    <!-- Project Overview Header -->
    <div class="bg-hw-card border border-hw-border rounded-2xl p-6 md:p-8 mb-8">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span class="text-xs font-mono uppercase px-3 py-1 rounded-full ${getStatusBadgeClass(p.status)}">
          ${p.status || 'Active'}
        </span>
        <span class="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
          ${p.category}
        </span>
        ${p.mcu ? `
          <span class="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center space-x-1">
            <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
            <span>${p.mcu}</span>
          </span>
        ` : ''}
        ${p.date ? `
          <span class="text-xs text-slate-400 ml-auto flex items-center space-x-1">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
            <span>${p.date}</span>
          </span>
        ` : ''}
      </div>

      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">${p.title}</h1>
      <p class="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">${p.tagline || ''}</p>

      <div class="mt-6 flex flex-wrap gap-2">
        ${tagsHtml}
      </div>

      ${(p.githubUrl || p.cadUrl) ? `
        <div class="mt-6 pt-5 border-t border-hw-border/80 flex flex-wrap gap-3">
          ${p.githubUrl ? `
            <a href="${p.githubUrl}" target="_blank" rel="noopener" class="px-4 py-2 rounded-lg bg-hw-surface border border-hw-border hover:border-cyan-400 text-xs font-medium text-white flex items-center space-x-2 transition">
              <i data-lucide="github" class="w-4 h-4"></i>
              <span>GitHub Repository</span>
            </a>
          ` : ''}
          ${p.cadUrl ? `
            <a href="${p.cadUrl}" target="_blank" rel="noopener" class="px-4 py-2 rounded-lg bg-hw-surface border border-hw-border hover:border-emerald-400 text-xs font-medium text-emerald-300 flex items-center space-x-2 transition">
              <i data-lucide="compass" class="w-4 h-4"></i>
              <span>Schematics / CAD Model</span>
            </a>
          ` : ''}
        </div>
      ` : ''}
    </div>

    <!-- Media Gallery -->
    <div class="mb-10">
      <div class="flex items-center space-x-2 mb-4">
        <i data-lucide="images" class="w-5 h-5 text-cyan-400"></i>
        <h2 class="text-lg font-bold text-white">Photos & Circuit Diagrams</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        ${photosGalleryHtml}
      </div>
    </div>

    <!-- Technical Architecture / Description -->
    ${p.description ? `
      <div class="bg-hw-card border border-hw-border rounded-2xl p-6 md:p-8 mb-10">
        <div class="flex items-center space-x-2 mb-4">
          <i data-lucide="layers" class="w-5 h-5 text-cyan-400"></i>
          <h2 class="text-lg font-bold text-white">Technical Architecture & Notes</h2>
        </div>
        <div class="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
          ${escapeHtml(p.description)}
        </div>
      </div>
    ` : ''}

    <!-- Bill of Materials Section -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <i data-lucide="list-checks" class="w-5 h-5 text-cyan-400"></i>
          <h2 class="text-lg font-bold text-white">Bill of Materials (BOM)</h2>
        </div>
        <span class="text-xs font-mono text-slate-400">${p.bom ? p.bom.length : 0} line items</span>
      </div>
      <div class="overflow-x-auto rounded-xl border border-hw-border bg-hw-card">
        <table class="w-full text-left text-xs">
          <thead class="bg-hw-surface border-b border-hw-border text-slate-400 font-mono">
            <tr>
              <th class="p-3">Component / Part</th>
              <th class="p-3 w-20">Qty</th>
              <th class="p-3">Designator / Ref</th>
              <th class="p-3">Datasheet / Link</th>
            </tr>
          </thead>
          <tbody>
            ${bomRowsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Firmware & Code Section -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <i data-lucide="code-2" class="w-5 h-5 text-cyan-400"></i>
          <h2 class="text-lg font-bold text-white">Firmware & Code Snippets</h2>
        </div>
        <span class="text-xs font-mono text-slate-400">${p.codeSnippets ? p.codeSnippets.length : 0} files</span>
      </div>
      ${codeSnippetsHtml}
    </div>

    <!-- Step-by-Step Build Workflow Timeline -->
    <div class="mb-12">
      <div class="flex items-center space-x-2 mb-4">
        <i data-lucide="git-merge" class="w-5 h-5 text-cyan-400"></i>
        <h2 class="text-lg font-bold text-white">Fabrication & Assembly Workflow</h2>
      </div>
      ${workflowStepsHtml}
    </div>
  `;

  // Re-run icons and syntax highlighting
  lucide.createIcons();
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
}

function navigateHome() {
  viewingProjectId = null;
  detailView.classList.add('hidden');
  homeView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderProjects();
}

// Copy Code Button
function copyCode(btn, snippetIndex) {
  const p = projects.find(item => item.id === viewingProjectId);
  if (!p || !p.codeSnippets || !p.codeSnippets[snippetIndex]) return;

  const codeText = p.codeSnippets[snippetIndex].code;
  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i><span class="text-emerald-400">Copied!</span>`;
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalText;
      lucide.createIcons();
    }, 2000);
  });
}

// Lightbox
function openLightbox(url) {
  lightboxImg.src = url;
  lightboxModal.classList.remove('hidden');
}
function closeLightbox() {
  lightboxModal.classList.add('hidden');
  lightboxImg.src = '';
}

// Project Modal Open & Edit
function openProjectModal(editIdOrType = null) {
  projectForm.reset();
  switchModalTab('tab-overview');

  const isEditing = editIdOrType && projects.some(p => p.id === editIdOrType);

  if (isEditing) {
    const p = projects.find(item => item.id === editIdOrType);
    if (!p) return;
    editingProjectId.value = p.id;
    const itemSec = p.section || 'projects';
    if (formSectionType) formSectionType.value = itemSec;
    onSectionTypeChange(itemSec);

    modalTitle.textContent = itemSec === 'component' ? 'Edit Component' : (itemSec === 'module' ? 'Edit Module' : 'Edit Hardware Project');

    document.getElementById('formTitle').value = p.title || '';
    document.getElementById('formTagline').value = p.tagline || '';
    document.getElementById('formCategory').value = p.category || 'IoT & Sensors';
    document.getElementById('formStatus').value = p.status || 'Completed';
    document.getElementById('formMcu').value = p.mcu || '';
    document.getElementById('formDate').value = p.date || '';
    document.getElementById('formTags').value = (p.tags || []).join(', ');
    document.getElementById('formDescription').value = p.description || '';
    document.getElementById('formGithubUrl').value = p.githubUrl || '';
    document.getElementById('formCadUrl').value = p.cadUrl || '';

    modalPhotos = [...(p.photos || [])];
    modalBom = JSON.parse(JSON.stringify(p.bom || []));
    modalCodeSnippets = JSON.parse(JSON.stringify(p.codeSnippets || []));
    modalWorkflowSteps = JSON.parse(JSON.stringify(p.workflow || []));
  } else {
    editingProjectId.value = '';
    const initialSection = (typeof editIdOrType === 'string' && ['projects', 'components', 'modules', 'project', 'component', 'module'].includes(editIdOrType))
      ? (editIdOrType.endsWith('s') ? editIdOrType : editIdOrType + 's')
      : currentSection;

    const normSec = initialSection.replace(/s$/, ''); // project, component, module
    if (formSectionType) formSectionType.value = normSec;
    onSectionTypeChange(normSec);

    const sectionTitles = {
      project: 'Upload Hardware Project',
      component: 'Upload Electronic Component',
      module: 'Upload Hardware Module'
    };
    modalTitle.textContent = sectionTitles[normSec] || 'Upload Hardware Item';
    document.getElementById('formDate').value = new Date().toISOString().split('T')[0];

    modalPhotos = [];
    modalBom = [
      { name: '', qty: 1, ref: '', link: '' }
    ];
    modalCodeSnippets = [
      { fileName: 'main.ino', language: 'arduino', code: '// Paste your setup() and loop() firmware code here\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n}' }
    ];
    modalWorkflowSteps = [
      { title: 'Step 1: Circuit Prototyping on Breadboard', description: 'Tested connections and checked voltages before soldering.', image: '' }
    ];
  }

  renderModalPhotosPreview();
  renderModalBomRows();
  renderModalCodeSnippets();
  renderModalWorkflowSteps();

  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeProjectModal() {
  projectModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Modal Tabs
function switchModalTab(tabId) {
  document.querySelectorAll('.modal-tab').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active', 'border-cyan-400', 'text-cyan-400');
      btn.classList.remove('border-transparent', 'text-slate-400');
    } else {
      btn.classList.remove('active', 'border-cyan-400', 'text-cyan-400');
      btn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  document.querySelectorAll('.modal-tab-content').forEach(content => {
    if (content.id === tabId) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  });
  lucide.createIcons();
}

// Photos Upload Handler
function handleFilesUpload(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      // Compress/resize large images if needed before storing as DataURL
      compressImage(e.target.result, 1280, 0.85, (compressedDataUrl) => {
        modalPhotos.push(compressedDataUrl);
        renderModalPhotosPreview();
      });
    };
    reader.readAsDataURL(file);
  });
}

function compressImage(base64Str, maxWidth, quality, callback) {
  const img = new Image();
  img.src = base64Str;
  img.onload = () => {
    let width = img.width;
    let height = img.height;
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL('image/jpeg', quality));
  };
  img.onerror = () => callback(base64Str);
}

function addPhotoFromUrl() {
  const urlInput = document.getElementById('photoUrlInput');
  const url = urlInput.value.trim();
  if (!url) return;
  modalPhotos.push(url);
  urlInput.value = '';
  renderModalPhotosPreview();
}

function removeModalPhoto(index) {
  modalPhotos.splice(index, 1);
  renderModalPhotosPreview();
}

function renderModalPhotosPreview() {
  if (modalPhotos.length === 0) {
    photosPreviewList.innerHTML = `<div class="col-span-full text-center py-3 text-xs text-slate-400">No photos added yet.</div>`;
    return;
  }

  photosPreviewList.innerHTML = modalPhotos.map((url, idx) => `
    <div class="relative group rounded-lg overflow-hidden border border-hw-border bg-hw-card h-24">
      <img src="${url}" alt="Preview" class="w-full h-full object-cover" />
      <button type="button" onclick="removeModalPhoto(${idx})" class="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition">
        <i data-lucide="trash" class="w-3.5 h-3.5"></i>
      </button>
      ${idx === 0 ? `<span class="absolute bottom-1 left-1 bg-cyan-950/90 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded font-mono">Cover</span>` : ''}
    </div>
  `).join('');
  lucide.createIcons();
}

// BOM Management
function addBomRow() {
  modalBom.push({ name: '', qty: 1, ref: '', link: '' });
  renderModalBomRows();
}

function removeBomRow(idx) {
  modalBom.splice(idx, 1);
  renderModalBomRows();
}

function renderModalBomRows() {
  if (modalBom.length === 0) {
    bomTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Click "+ Add Component" to add items to your BOM.</td></tr>`;
    return;
  }

  bomTableBody.innerHTML = modalBom.map((item, idx) => `
    <tr>
      <td class="p-2">
        <input type="text" placeholder="e.g. 10k Resistor 0805" value="${escapeHtml(item.name || '')}" oninput="modalBom[${idx}].name = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-2.5 py-1 text-slate-200">
      </td>
      <td class="p-2 w-20">
        <input type="number" min="1" value="${item.qty || 1}" oninput="modalBom[${idx}].qty = parseInt(this.value) || 1" class="w-full bg-hw-bg border border-hw-border rounded px-2 py-1 text-slate-200 font-mono">
      </td>
      <td class="p-2">
        <input type="text" placeholder="e.g. R1, R2" value="${escapeHtml(item.ref || '')}" oninput="modalBom[${idx}].ref = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-2.5 py-1 text-slate-200 font-mono">
      </td>
      <td class="p-2">
        <input type="url" placeholder="https://..." value="${escapeHtml(item.link || '')}" oninput="modalBom[${idx}].link = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-2.5 py-1 text-slate-200">
      </td>
      <td class="p-2 text-center">
        <button type="button" onclick="removeBomRow(${idx})" class="text-slate-400 hover:text-red-400 p-1">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

// Code Snippets in Modal
function addCodeSnippetRow() {
  modalCodeSnippets.push({
    fileName: 'firmware.cpp',
    language: 'cpp',
    code: ''
  });
  renderModalCodeSnippets();
}

function removeCodeSnippetRow(idx) {
  modalCodeSnippets.splice(idx, 1);
  renderModalCodeSnippets();
}

function renderModalCodeSnippets() {
  if (modalCodeSnippets.length === 0) {
    codeSnippetsContainer.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 border border-dashed border-hw-border rounded-xl">No code files added yet. Click "+ Add Code File" above.</div>`;
    return;
  }

  codeSnippetsContainer.innerHTML = modalCodeSnippets.map((snip, idx) => `
    <div class="border border-hw-border rounded-xl p-4 bg-hw-card/60 space-y-3">
      <div class="flex items-center justify-between gap-3">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-mono text-slate-400 mb-1">File Name</label>
            <input type="text" value="${escapeHtml(snip.fileName || '')}" oninput="modalCodeSnippets[${idx}].fileName = this.value" placeholder="e.g. main.cpp or sensors.py" class="w-full bg-hw-bg border border-hw-border rounded px-2.5 py-1 text-xs text-slate-200 font-mono">
          </div>
          <div>
            <label class="block text-[11px] font-mono text-slate-400 mb-1">Language</label>
            <select onchange="modalCodeSnippets[${idx}].language = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-2.5 py-1 text-xs text-slate-200">
              <option value="cpp" ${snip.language === 'cpp' ? 'selected' : ''}>C++ / Arduino</option>
              <option value="python" ${snip.language === 'python' ? 'selected' : ''}>Python / MicroPython</option>
              <option value="rust" ${snip.language === 'rust' ? 'selected' : ''}>Rust</option>
              <option value="json" ${snip.language === 'json' ? 'selected' : ''}>JSON / Config</option>
              <option value="plaintext" ${snip.language === 'plaintext' ? 'selected' : ''}>Plain Text</option>
            </select>
          </div>
        </div>
        <button type="button" onclick="removeCodeSnippetRow(${idx})" class="text-slate-400 hover:text-red-400 p-1.5 self-end rounded hover:bg-slate-800">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>

      <div>
        <label class="block text-[11px] font-mono text-slate-400 mb-1">Source Code</label>
        <textarea rows="6" oninput="modalCodeSnippets[${idx}].code = this.value" placeholder="// Paste code here..." class="w-full bg-hw-bg border border-hw-border rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400">${escapeHtml(snip.code || '')}</textarea>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Workflow Steps in Modal
function addWorkflowStepRow() {
  modalWorkflowSteps.push({
    title: '',
    description: '',
    image: ''
  });
  renderModalWorkflowSteps();
}

function removeWorkflowStepRow(idx) {
  modalWorkflowSteps.splice(idx, 1);
  renderModalWorkflowSteps();
}

function renderModalWorkflowSteps() {
  if (modalWorkflowSteps.length === 0) {
    workflowStepsContainer.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 border border-dashed border-hw-border rounded-xl">No build steps added yet. Click "+ Add Build Step" to document your fabrication log.</div>`;
    return;
  }

  workflowStepsContainer.innerHTML = modalWorkflowSteps.map((step, idx) => `
    <div class="border border-hw-border rounded-xl p-4 bg-hw-card/60 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-cyan-400">Step #${idx + 1}</span>
        <button type="button" onclick="removeWorkflowStepRow(${idx})" class="text-slate-400 hover:text-red-400 p-1">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>

      <div>
        <input type="text" placeholder="Step Title (e.g. Solder SMD Resistors & Power Check)" value="${escapeHtml(step.title || '')}" oninput="modalWorkflowSteps[${idx}].title = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-3 py-1.5 text-xs text-white font-medium">
      </div>

      <div>
        <textarea rows="2" placeholder="Step description, findings, precautions, and test results..." oninput="modalWorkflowSteps[${idx}].description = this.value" class="w-full bg-hw-bg border border-hw-border rounded-lg p-2.5 text-xs text-slate-200">${escapeHtml(step.description || '')}</textarea>
      </div>

      <div>
        <input type="url" placeholder="Optional step photo URL (e.g. Imgur / Unsplash)" value="${escapeHtml(step.image || '')}" oninput="modalWorkflowSteps[${idx}].image = this.value" class="w-full bg-hw-bg border border-hw-border rounded px-3 py-1 text-xs text-slate-300">
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Handle Form Submission
function handleFormSubmit(e) {
  e.preventDefault();

  const secTypeElem = document.getElementById('formSectionType');
  const sectionType = secTypeElem ? (secTypeElem.value.endsWith('s') ? secTypeElem.value : secTypeElem.value + 's') : currentSection;
  const title = document.getElementById('formTitle').value.trim();
  const tagline = document.getElementById('formTagline').value.trim();
  const category = document.getElementById('formCategory').value;
  const status = document.getElementById('formStatus').value;
  const mcu = document.getElementById('formMcu').value.trim();
  const date = document.getElementById('formDate').value;
  const tagsStr = document.getElementById('formTags').value;
  const description = document.getElementById('formDescription').value.trim();
  const githubUrl = document.getElementById('formGithubUrl').value.trim();
  const cadUrl = document.getElementById('formCadUrl').value.trim();

  const tags = tagsStr.split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  // Filter empty BOM items
  const cleanBom = modalBom.filter(b => b.name && b.name.trim().length > 0);
  // Filter empty code snippets
  const cleanCode = modalCodeSnippets.filter(c => c.fileName || c.code);
  // Filter workflow steps
  const cleanWorkflow = modalWorkflowSteps.filter(w => w.title || w.description);

  const editId = editingProjectId.value;

  if (editId) {
    // Update existing
    const index = projects.findIndex(p => p.id === editId);
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        section: sectionType,
        title,
        tagline,
        category,
        status,
        mcu,
        date,
        tags,
        description,
        githubUrl,
        cadUrl,
        photos: modalPhotos,
        bom: cleanBom,
        codeSnippets: cleanCode,
        workflow: cleanWorkflow
      };
    }
  } else {
    // Create new
    const newProject = {
      id: (sectionType === 'components' ? 'comp_' : (sectionType === 'modules' ? 'mod_' : 'proj_')) + Date.now(),
      section: sectionType,
      title,
      tagline,
      category,
      status,
      mcu,
      date: date || new Date().toISOString().split('T')[0],
      tags,
      description,
      githubUrl,
      cadUrl,
      photos: modalPhotos,
      bom: cleanBom,
      codeSnippets: cleanCode,
      workflow: cleanWorkflow
    };
    projects.unshift(newProject);
  }

  saveProjects();
  closeProjectModal();
  updateStats();
  if (!editId && sectionType !== currentSection) {
    switchMainTab(sectionType);
  }

  if (editId && viewingProjectId === editId) {
    viewProject(editId);
  } else {
    renderProjects();
  }
}

// Delete Project
function confirmDeleteProject(id) {
  if (confirm('Are you sure you want to delete this hardware project? This action cannot be undone.')) {
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    updateStats();
    navigateHome();
  }
}

// Export single project as formatted Markdown (for GitHub README)
function exportSingleProjectMarkdown(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;

  let md = `# ${p.title}\n\n`;
  if (p.tagline) md += `> ${p.tagline}\n\n`;

  md += `**Category:** ${p.category} | **Status:** ${p.status} | **MCU:** ${p.mcu || 'N/A'} | **Date:** ${p.date || 'N/A'}\n\n`;

  if (p.photos && p.photos.length > 0) {
    md += `## Gallery\n\n`;
    p.photos.forEach(img => {
      md += `![](${img})\n\n`;
    });
  }

  if (p.description) {
    md += `## Architecture & Overview\n\n${p.description}\n\n`;
  }

  if (p.bom && p.bom.length > 0) {
    md += `## Bill of Materials (BOM)\n\n`;
    md += `| Part | Qty | Designator | Link |\n|---|---|---|---|\n`;
    p.bom.forEach(b => {
      md += `| ${b.name} | ${b.qty} | ${b.ref || '-'} | ${b.link ? `[Link](${b.link})` : '-'} |\n`;
    });
    md += `\n`;
  }

  if (p.workflow && p.workflow.length > 0) {
    md += `## Build Workflow & Fabrication Log\n\n`;
    p.workflow.forEach((step, idx) => {
      md += `### Step ${idx + 1}: ${step.title}\n\n${step.description}\n\n`;
      if (step.image) md += `![](${step.image})\n\n`;
    });
  }

  if (p.codeSnippets && p.codeSnippets.length > 0) {
    md += `## Source Code\n\n`;
    p.codeSnippets.forEach(snip => {
      md += `### ${snip.fileName}\n\`\`\`${snip.language || ''}\n${snip.code}\n\`\`\`\n\n`;
    });
  }

  downloadFile(`${p.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_readme.md`, md, 'text/markdown');
}

// Export / Import Data (Backup)
function exportDataJson() {
  const dataStr = JSON.stringify(projects, null, 2);
  downloadFile('circuitr_hardware_projects_backup.json', dataStr, 'application/json');
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        if (confirm(`Import ${imported.length} projects? This will merge with your current projects.`)) {
          // Merge avoiding ID duplication
          const existingIds = new Set(projects.map(p => p.id));
          imported.forEach(item => {
            if (existingIds.has(item.id)) {
              item.id = 'proj_' + Math.random().toString(36).substr(2, 9);
            }
            projects.unshift(item);
          });
          saveProjects();
          updateStats();
          renderProjects();
          alert('Successfully imported hardware projects!');
        }
      } else {
        alert('Invalid JSON file format. Expected a project array.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Helper Utilities
function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
