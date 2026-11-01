# CIRCUITR // Hardware Engineering Project Hub

> **Live Website:** [https://dipanr705-12.github.io/showcase/](https://dipanr705-12.github.io/showcase/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-06b6d4?style=for-the-badge&logo=github)](https://dipanr705-12.github.io/showcase/)
[![Status](https://img.shields.io/badge/Status-Active-emerald?style=for-the-badge)](https://dipanr705-12.github.io/showcase/)

A modern, responsive web application designed for hardware makers, embedded engineers, and electronics hobbyists to upload, showcase, and archive their hardware projects, workbench photos, circuit schematics, source firmware, and step-by-step fabrication workflows.

---

## 🌐 Live Access

Visit the live site directly in your browser:
### 🔗 [https://dipanr705-12.github.io/showcase/](https://dipanr705-12.github.io/showcase/)

*(Hosted 24/7 on GitHub Pages — works anywhere, on any device, without requiring a local server).*

---

## ✨ Key Features

1. **Multi-Media Project Showcase**:
   - Filter by categories: *IoT & Sensors*, *Robotics*, *PCB & Circuits*, *Embedded Systems*, *3D Printing*, *Wearables*, *FPGA*.
   - Live search across titles, microcontroller types (ESP32, RP2040, STM32, Arduino), tags, and parts in the BOM.
   - Status indicators: *Completed*, *Prototype*, *In Progress*, *Archived*.

2. **Hardware-Specific Upload System**:
   - **Photos & Circuit Diagrams**: Drag-and-drop or select multiple photos with automatic in-browser client compression to preserve high fidelity.
   - **Bill of Materials (BOM)**: Track components, designators (R1, C2, U1), quantities, and direct supplier or datasheet links.
   - **Firmware & Source Code**: Multiple code tabs with syntax highlighting (C++, Arduino, MicroPython, Rust, Verilog, JSON) and 1-click clipboard copy.
   - **Step-by-Step Workflow Log**: Timeline of fabrication, PCB etching/reflow, soldering, calibration, and debugging phases with step photos.
   - **Repository Links**: Direct shortcuts to GitHub repositories and KiCad / Onshape / EasyEDA CAD models.

3. **Local-First & Export Ready**:
   - Stores everything directly in your browser's persistent storage.
   - **1-Click README Exporter**: Converts any project into a formatted GitHub-ready `README.md` file.
   - **JSON Backup & Restore**: Export all projects as a single backup file and restore them on any computer.

---

## 💻 Running Locally (Optional)

You can also run it locally on your computer:

```bash
# Clone the repository
git clone https://github.com/dipanr705-12/showcase.git
cd showcase

# Start with Node.js
node server.js
```
Then open `http://localhost:3000`.
