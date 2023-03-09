const { spawn } = require('child_process');

class ZecWalletCLI {
  constructor(cliPath) {
    this.cliPath = cliPath;
  }

  async executeCommand(args) {
    return new Promise((resolve, reject) => {
      const zecWalletCLI = spawn(this.cliPath, args);

      let output = '';
      let error = '';

      zecWalletCLI.stdout.on('data', (data) => {
        output += data.toString();
      });

      zecWalletCLI.stderr.on('data', (data) => {
        error += data.toString();
      });

      zecWalletCLI.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`zecwallet-cli exited with code ${code}: ${error}`));
        } else {
          resolve(output);
        }
      });

      zecWalletCLI.on('error', (err) => {
        reject(new Error(`Failed to start zecwallet-cli: ${err}`));
      });
    });
  }

  async getAddresses() {
    const args = ['addresses'];
    const output = await this.executeCommand(args);
    const addresses = output;
    return addresses;
  }

  async getHeight() {
    const args = ['height'];
    const output = await this.executeCommand(args);
    const regex = /"height":\s*(\d+)/;
    const match = output.match(regex);
  
    if (match) {
      const height = parseInt(match[1]);
      return height;
    } else {
      const height = parseInt(output.trim());
      return height;
    }
  }

  async getSyncStatus() {
    const args = ['syncstatus'];
    const output = await this.executeCommand(args);
    const syncStatus = JSON.parse(output.trim());
    return syncStatus;
  }

  async sync() {
    const args = ['sync'];
    const output = await this.executeCommand(args);
    return output.trim();
  }

  async listTransactions() {
    const args = ['list'];
    const output = await this.executeCommand(args);
    const transactions = output;
    return transactions;
  }

  async sendZEC(fromAddress, toAddress, amount, memo) {
    const args = ['send', fromAddress, toAddress, amount, memo];
    const output = await this.executeCommand(args);
    return output.trim();
  }
}

exports.ZecWalletCLI = ZecWalletCLI;
