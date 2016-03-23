import { IPluginConfiguration } from "../configuration/interfaces";
import { IExecutionResult } from "../execution/interfaces";
import { IFeedbackEmitter } from "./interfaces";
const PlainMessageView = require("atom-message-panel").PlainMessageView;

export default class FeedbackEmitter implements IFeedbackEmitter {
    constructor(private _messagePanel: any) {
    }

    public onResult(result: IExecutionResult, config: IPluginConfiguration) {
      if (result.success) {
        this.emitSuccessFeedback(result, config);
      } else {
        this.emitFailureFeedback(result);
      }
    }

    private emitSuccessFeedback(result: IExecutionResult, config: IPluginConfiguration) {
      if (config.showSuccess) {
          this.showSuccess(result.command, result.output);
          if (config.autohideSuccess) {
              this.autohide(config.autohideSuccessTimeout);
          }
      } else {
          this._messagePanel.clear();
          this._messagePanel.close();
      }
    }

    private showSuccess(command: string, output: string) {
        this._messagePanel.clear();
        this._messagePanel.attach();
        this._messagePanel.add(new PlainMessageView({
            className: "text-success",
            message: "Success: " + command + (output ? " => " + output : "")
        }));
    }

    private autohide(timeout: number) {
        setTimeout(() => this._messagePanel.close(), timeout);
    }

    private emitFailureFeedback(result: IExecutionResult) {
      const { command, output } = result;
      this._messagePanel.clear();
      this._messagePanel.attach();
      this._messagePanel.add(new PlainMessageView({
          className: "text-error",
          message: "Failure: " + command + " => " + output
      }));
    }
}