import { Request, Response, Router } from 'express';
import { ledgerSandboxService } from '../blockchain/LedgerSandboxService.js';
import logger from '../utils/logger.js';

const router = Router();

/**
 * GET /api/v1/sandbox/config
 * Get current ledger sandbox configuration
 */
router.get('/config', (req: Request, res: Response) => {
  res.json(ledgerSandboxService.getConfig());
});

/**
 * POST /api/v1/sandbox/config
 * Update ledger sandbox configuration
 */
router.post('/config', (req: Request, res: Response) => {
  try {
    const { protocolVersion, experimentalHostFunctions, simulatedLedgerSequence } = req.body;
    
    const updates: any = {};
    if (protocolVersion !== undefined) updates.protocolVersion = Number(protocolVersion);
    if (experimentalHostFunctions !== undefined) updates.experimentalHostFunctions = Boolean(experimentalHostFunctions);
    if (simulatedLedgerSequence !== undefined) updates.simulatedLedgerSequence = Number(simulatedLedgerSequence);

    const newConfig = ledgerSandboxService.updateConfig(updates);
    res.json({
      message: 'Sandbox configuration updated successfully',
      config: newConfig,
      environment: ledgerSandboxService.checkHostEnvironment()
    });
  } catch (error) {
    logger.error('Error updating sandbox config:', error);
    res.status(400).json({ error: 'Invalid configuration parameters' });
  }
});

/**
 * GET /api/v1/sandbox/status
 * Get the status of the simulated host environment
 */
router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'active',
    host: ledgerSandboxService.checkHostEnvironment(),
    currentLedger: ledgerSandboxService.getConfig().simulatedLedgerSequence
  });
});

export default router;
