# InventoryMonitor

InventoryMonitor is a simple inventory management system that helps you keep track of orders and inventory levels.

## Getting Started

Please note you must install `Docker` on your machine.

<https://docs.docker.com/engine/install/debian/>

<https://docs.docker.com/compose/install/linux/>

## Running the app

Clone this repository:

```bash
git clone https://github.com/dp9898CZ/order-stock-monitor.git
cd order-stock-monitor
```

Create `.env` file for database credentials:

```bash
cp .env.template .env
```

Fill in credentials in `.env` file.

To build project and start application run:

```bash
docker compose up -d
```

Application should be running on `localhost`.
