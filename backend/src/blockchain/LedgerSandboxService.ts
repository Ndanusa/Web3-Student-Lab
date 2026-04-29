import logger from '../utils/logger.js';

export interface SandboxConfig {
  protocolVersion: number;
  experimentalHostFunctions: boolean;
  simulatedLedgerSequence: number;
}

/**
 * Ledger Sandbox Service
 * Manages the simulated Soroban environment configuration,
 * allowing simulations to run against specific protocol versions.
 */
class LedgerSandboxService {
  private config: SandboxConfig = {
    protocolVersion: Number(process.env.SIMULATED_PROTOCOL_VERSION) || 20,
    experimentalHostFunctions: process.env.ENABLE_EXPERIMENTAL_HOST_FUNCTIONS === 'true',
    simulatedLedgerSequence: 1000,
  };

  constructor() {
    logger.info(
      `Ledger Sandbox Service initialized: Protocol ${this.config.protocolVersion}, Experimental Functions: ${this.config.experimentalHostFunctions}`
    );
  }

  /**
   * Gets the current sandbox configuration
   */
  getConfig(): SandboxConfig {
    return { ...this.config };
  }

  /**
   * Updates the sandbox configuration
   */
  updateConfig(newConfig: Partial<SandboxConfig>): SandboxConfig {
    this.config = { ...this.config, ...newConfig };
    logger.info(
      `Ledger Sandbox configuration updated: Protocol ${this.config.protocolVersion}, Experimental Functions: ${this.config.experimentalHostFunctions}`
    );
    return this.getConfig();
  }

  /**
   * Validates if a feature is supported by the current protocol version
   */
  isFeatureSupported(requiredProtocol: number): boolean {
    return this.config.protocolVersion >= requiredProtocol;
  }

  /**
   * Simulates a Soroban host environment check
   */
  checkHostEnvironment(): string {
    if (this.config.experimentalHostFunctions) {
      return `soroban-env-host (Protocol ${this.config.protocolVersion}) [EXPERIMENTAL ENABLED]`;
    }
    return `soroban-env-host (Protocol ${this.config.protocolVersion})`;
  }

  /**
   * Increments the simulated ledger sequence
   */
  nextLedger(): number {
    this.config.simulatedLedgerSequence++;
    return this.config.simulatedLedgerSequence;
  }
}

export const ledgerSandboxService = new LedgerSandboxService();
