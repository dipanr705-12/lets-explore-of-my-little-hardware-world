# CIRCUITR // Hardware Engineering Project Hub

A modern web application built specifically for hardware makers, embedded engineers, and electronics hobbyists to upload, showcase, and archive their hardware projects, photos, schematics, source code, and step-by-step fabrication workflows.

## Key Features

1. **Multi-Media Project Showcase**:
   - Filter by categories: *IoT & Sensors*, *Robotics*, *PCB & Circuits*, *Embedded Systems*, *3D Printing*, *Wearables*, *FPGA*.
   - Live search across titles, microcontroller types (ESP32, RP2040, STM32, Arduino), tags, and parts in the BOM.
   - Status indicators: *Completed*, *Prototype*, *In Progress*, *Archived*.

2. **Hardware-Specific Upload System**:
   - **Photos & Circuit Diagrams**: Drag-and-drop or select multiple photos with automatic in-browser client compression to preserve high fidelity without exceeding storage quotas.
   - **Bill of Materials (BOM)**: Track components, designators (R1, C2, U1), quantities, and direct supplier or datasheet links.
   - **Firmware & Source Code**: Multiple code tabs with syntax highlighting (C++, Arduino, MicroPython, Rust, Verilog, JSON) and 1-click clipboard copy.
   - **Step-by-Step Workflow Log**: Timeline of fabrication, PCB etching/reflow, soldering, calibration, and debugging phases with step photos.
   - **Repository Links**: Direct shortcuts to GitHub repositories and KiCad / Onshape / EasyEDA CAD models.

3. **Local-First & Export Ready**:
   - Stores everything directly in your browser's persistent storage.
   - **1-Click README Exporter**: Converts any project into a formatted GitHub-ready `README.md` file.
   - **JSON Backup & Restore**: Export all projects as a single backup file and restore them on any computer.

## How to Run

Simply open [index.html](file:///C:/Users/dipan%20roy/.gemini/antigravity/scratch/hardware-project-hub/index.html) in your browser:

- Double click `index.html` in file explorer, OR
- Run a lightweight local server:
  ```bash
  cd "C:\Users\dipan roy\.gemini\antigravity\scratch\hardware-project-hub"
  npx serve .
  # or
  python -m http.server 8080
  ```
