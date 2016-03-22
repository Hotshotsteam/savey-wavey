/**
 * Represents a single save command in the on-save configuration.
 */
export interface ISaveCommand {
  /**
   * The glob containing the files to watch.
   */
  watch: string;

  /**
   * The file basepath
   */
  base: string;

  /**
   * The command to execute when files change.
   */
  command: string;
}

export interface IConfiguration {
  showSuccess: boolean;
  autohideSuccess: boolean;
  autohideSuccessTimeout: number;
}

export interface IConfigFile {
  commands: ISaveCommand[];
  config: IConfiguration;
};
