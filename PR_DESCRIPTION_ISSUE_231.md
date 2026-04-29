## Description

- **Advanced Circuit Breaker Pattern**: Implemented a robust state-machine (`CLOSED`, `OPEN`, `HALF_OPEN`) to handle 3rd-party API failures gracefully.
- **Circuit Breaker Manager**: Created a centralized management system to monitor and configure resiliency thresholds across the backend.
- **External Service Wrapping**: Integrated circuit breakers into the `CertificateBlockchainService` (Stellar) and `GeneratorService` (OpenAI) to prevent cascading failures.
- **Graceful Degradation & Fallbacks**: Implemented fallback strategies for all wrapped calls, ensuring the system remains functional even when external nodes or AI services are down.
- **Health Monitoring API**: Added a new `/api/v1/health/circuit-breakers` endpoint to provide real-time visibility into system resiliency status.
- **Frontend Resiliency UI**: Created a `ResiliencyBanner` component that notifies users when the platform is operating in a degraded state due to external dependency issues.

## Reference Issues

- Closes #231

## Type of Change

- [x] **Bug fix** (non-breaking change which fixes an issue)
- [x] **New feature** (non-breaking change which adds functionality)
- [ ] **Breaking change** (fix or feature that would cause existing functionality to not work as expected)
- [ ] **Documentation Update**

## Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
