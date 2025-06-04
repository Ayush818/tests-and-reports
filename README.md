# TESTS-AND-REPORTS

*Empower Quality: Automate, Validate, Deliver Excellence*

Built with the tools and technologies for comprehensive test automation

## Table of Contents

* [Overview](#overview)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Testing](#testing)
* [Features](#features)
* [Project Structure](#project-structure)
* [Configuration](#configuration)
* [Test Types](#test-types)
* [Reports](#reports)
* [CI/CD Integration](#cicd-integration)
* [Contributing](#contributing)
* [License](#license)

## Overview

**tests-and-reports** is a comprehensive testing framework designed to elevate the quality and reliability of web and mobile applications through robust automation.

### Why tests-and-reports?

This project streamlines the testing process, ensuring developers can efficiently validate functionality and performance. The core features include:

* **🚀 E2E Web Automation:** Streamlines automated testing for web applications, enhancing quality and security.
* **📱 Mobile Automation:** Facilitates seamless interaction with mobile interfaces using WebDriverIO and Appium.
* **⚙️ Robust Configuration:** Customizable settings for both web and mobile testing environments, improving maintainability.
* **👤 User Interaction Simulation:** Automates critical workflows like registration and checkout, ensuring a reliable user experience.
* **📊 Performance Testing:** Enables load and stress testing for APIs, helping developers optimize application performance.
* **🔄 Dynamic Test Data:** Supports varied test scenarios with unique user credentials, enhancing test coverage.

## Getting Started

### Prerequisites

This project requires the following dependencies:

* **Programming Language:** TypeScript
* **Package Manager:** npm
* **Node.js:** Version 16 or higher
* **Java:** Required for Appium mobile testing

### Installation

Build tests-and-reports from the source and install dependencies:

1. **Clone the repository:**

```sh
git clone https://github.com/Ayush818/tests-and-reports
```

2. **Navigate to the project directory:**

```sh
cd tests-and-reports
```

3. **Install the dependencies:**

Using npm:
```sh
npm install
```

### Usage

Run the project with:

Using npm:
```sh
npm start
```

For specific test execution:
```sh
# Run E2E web automation tests
cd 1-e2e-web-automation && npm test

# Run E2E mobile automation tests
cd 2-e2e-mobile-automation && npm test

# Run logical and security tests
cd 3-logical-and-security-testing && npm test

# Run web performance tests
cd 4a-performance-testing-web && npm test

# Run mobile performance tests
cd 4b-performance-testing-mobile && npm test
```

### Testing

Tests-and-reports uses WebDriverIO as the primary test framework. Run the test suite with:

Using npm:
```sh
npm test
```

## Features

### Web Automation
- Cross-browser compatibility testing
- Responsive design validation
- Form interaction and validation
- Authentication workflows
- Page load performance monitoring

### Mobile Automation
- Native and hybrid app testing
- Device-specific testing capabilities
- Touch gesture simulation
- Mobile performance testing
- Cross-platform compatibility

### Performance Testing
- API load testing
- Stress testing capabilities
- Response time monitoring
- Throughput analysis
- Bottleneck identification

### Test Data Management
- Dynamic test data generation
- User credential management
- Test environment configuration
- Data-driven testing support

## Project Structure

```
tests-and-reports/
├── 1-e2e-web-automation/           # End-to-end web automation tests
├── 2-e2e-mobile-automation/        # End-to-end mobile automation tests
├── 3-logical-and-security-testing/ # Logic and security validation tests
├── 4a-performance-testing-web/     # Web performance testing suite
├── 4b-performance-testing-mobile/  # Mobile performance testing suite
├── 5-test-management-docs/         # Test documentation and management
├── .gitignore                      # Git ignore configuration
└── README.md                       # Project documentation
```

## Configuration

### WebDriverIO Configuration
The framework uses WebDriverIO for both web and mobile automation. Configuration files are located in the `config/` directory:

- `wdio.conf.js`: Main WebDriverIO configuration
- `appium.conf.js`: Mobile-specific Appium settings
- Environment-specific configurations in `config/environments/`

### Environment Setup
```javascript
// Example configuration
export const config = {
  runner: 'local',
  specs: ['./src/tests/**/*.spec.ts'],
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--no-sandbox']
    }
  }],
  framework: 'mocha',
  reporters: ['spec', 'allure']
};
```

## Test Categories

### 1. E2E Web Automation (`1-e2e-web-automation/`)
- Cross-browser compatibility testing
- User workflow automation
- Form validation and submission
- Authentication and authorization flows
- Responsive design validation

### 2. E2E Mobile Automation (`2-e2e-mobile-automation/`)
- Native and hybrid mobile app testing
- Touch gesture simulation
- Device-specific functionality testing
- Mobile user experience validation
- Cross-platform mobile testing

### 3. Logical and Security Testing (`3-logical-and-security-testing/`)
- Business logic validation
- Security vulnerability assessments
- Input validation and sanitization
- Authentication and authorization security
- Data integrity and privacy testing

### 4a. Web Performance Testing (`4a-performance-testing-web/`)
- Page load time optimization
- Resource loading analysis
- Network performance monitoring
- Browser rendering performance
- Web vitals measurement

### 4b. Mobile Performance Testing (`4b-performance-testing-mobile/`)
- App launch time measurement
- Memory usage optimization
- Battery consumption analysis
- Network efficiency on mobile
- Device-specific performance metrics

### 5. Test Management Documentation (`5-test-management-docs/`)
- Test planning and strategy documents
- Test case documentation
- Test execution reports
- Quality assurance guidelines
- Testing best practices and standards

## Reports

The framework generates comprehensive test reports including:

- **HTML Reports:** Visual test execution results
- **Allure Reports:** Interactive test reporting with screenshots
- **JSON Reports:** Machine-readable test data
- **Performance Metrics:** Response times and resource usage
- **Screenshots:** Visual evidence of test execution

### Generating Reports
```sh
# Generate HTML reports
npm run report:html

# Generate Allure reports
npm run report:allure

# Open Allure report in browser
npm run report:open
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Test Automation
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Generate reports
        run: npm run report:allure
      - name: Upload test results
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: reports/
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "test"]
```

## Contributing

We welcome contributions to improve the testing framework! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Update documentation for new features
- Follow the existing code style and conventions

## Available Scripts

Each test category has its own execution commands:

### E2E Web Automation
```sh
cd 1-e2e-web-automation
npm install && npm test
```

### E2E Mobile Automation
```sh
cd 2-e2e-mobile-automation
npm install && npm test
```

### Logical and Security Testing
```sh
cd 3-logical-and-security-testing
npm install && npm test
```

### Web Performance Testing
```sh
cd 4a-performance-testing-web
npm install && npm test
```

### Mobile Performance Testing
```sh
cd 4b-performance-testing-mobile
npm install && npm test
```

### General Commands
- `npm install`: Install dependencies for each module
- `npm test`: Execute tests within each category
- `npm run lint`: Run code quality checks
- `npm run report`: Generate test reports

## Troubleshooting

### Common Issues

**WebDriver connection errors:**
- Ensure browser drivers are properly installed
- Check if the correct browser version is specified
- Verify WebDriver service is running

**Mobile testing setup:**
- Install Android SDK and set ANDROID_HOME
- Start Appium server before running mobile tests
- Ensure device/emulator is connected and accessible

**Test execution timeouts:**
- Increase timeout values in configuration
- Check network connectivity for web tests
- Verify application responsiveness

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Author:** Ayush
- **GitHub:** [@Ayush818](https://github.com/Ayush818)
- **Repository:** [tests-and-reports](https://github.com/Ayush818/tests-and-reports)

---

*Built with ❤️ for quality assurance and test automation excellence*
