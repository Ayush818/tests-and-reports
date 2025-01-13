# Performance Testing with k6

This guide explains how to install k6, write test scripts, and run load and stress tests with JSON output. The tests are designed for endpoints `/client_register` (load testing) and `/client_login` (stress testing) using the k6 tool.

## Prerequisites

- k6 installed on your system (see Installation Guide below).
- Access to the Flask API endpoints `/client_register` and `/client_login`.
- Basic understanding of JavaScript (for writing k6 test scripts).

## Installation Guide

### Install k6 on Your System

#### **Mac (via Homebrew)**

```bash
brew install k6
```

#### **Ubuntu/Debian**

```bash
sudo apt update
sudo apt install -y k6
```

#### **Windows**

1. Download the k6 binary from the [k6 GitHub releases page](https://github.com/grafana/k6/releases).
2. Extract the downloaded file.
3. Add the extracted folder to your PATH to access k6 globally.

#### **Using Docker**

If you prefer not to install k6 directly, you can use Docker:

```bash
docker run -i grafana/k6 run - <script.js
```

#### Verify Installation

To ensure k6 is installed correctly, run:

```bash
k6 version
```

You should see the installed k6 version.

---

### Run Tests

#### Before running tests, make sure the flask api server is running

```bash
python3 Soar_Test/task.py
```

#### Load Testing `/client_register`

```bash
k6 run tests/load_client_register.js --out json=load_test_results.json

```

#### Stress Testing `/client_login`

```bash
k6 run tests/stress_client_login.js --out json=stress_test_results.json

```

#### BDD Load Testing (for both `/client_register` and `/client_login`)

```bash
k6 run tests/bdd_test.js --out json=bdd_test_results.json
```

### Exporting Results

Results will be exported in JSON format to the specified file (e.g., `results_client_register.json`). You can analyze these results using JSON tools or integrate them into CI/CD pipelines.

---

## Best Practices

### Simulating 10 Requests Concurrently

Use the `vus` (virtual users) option in your test scripts or command-line arguments to simulate concurrent requests. Example:

```bash
k6 run --vus 10 --duration 30s tests/load_test_client_register.js
```

### Integration with CI/CD

1. Add k6 to your CI/CD pipeline by running test scripts as part of your build process.
2. Use the JSON output format for easy parsing and reporting.
3. Example GitHub Actions workflow:

   ```yaml
   name: Performance Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Code
           uses: actions/checkout@v3

         - name: Install k6
           run: sudo apt install -y k6

         - name: Run Tests
           run: k6 run --out json=results.json tests/load_test_client_register.js

         - name: Upload Results
           uses: actions/upload-artifact@v3
           with:
             name: test-results
             path: results.json
   ```

---
