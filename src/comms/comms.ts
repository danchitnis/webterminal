//For serial communication
// https://web.dev/serial/

export class ComPort {
  private port: SerialPort | undefined;
  private reader: ReadableStreamReader<Uint8Array> | undefined;
  private stopRX = false;
  private rxPromise: Promise<void> | undefined;

  constructor() {}

  public portOpen = async () => {
    // Prompt user to select any serial port.
    this.port = await navigator.serial.requestPort();
    console.log(this.port);
    if (this.port) {
      console.log(this.port.getInfo());
      await this.port.open({ baudRate: 115200 });
      this.stopRX = false;
      this.rxPromise = this.readUntilClosed();
    }
  };

  private readUntilClosed = async () => {
    if (this.port) {
      while (this.port.readable && !this.stopRX) {
        this.reader = this.port.readable.getReader();
        console.log(this.reader);

        try {
          while (true) {
            const { value, done } = await this.reader.read();
            if (done) {
              // Allow the serial port to be closed later.
              this.reader.releaseLock();
              break;
            }
            if (value) {
              //console.log(value);
              //logData(value);
              this.dataRXCallback(value);
            }
          }
        } catch (error) {
          // TODO: Handle non-fatal read error.
          console.error(error);
        } finally {
          this.reader.releaseLock();
        }
      }
      await this.port.close();
      console.log('Port closing..');
    }
  };

  public portClose = async () => {
    this.stopRX = true;
    if (this.reader && this.rxPromise) {
      console.log(this.reader);
      this.reader.cancel();
      await this.rxPromise;
      console.log('Port fully closed');
    }
  };

  public dataRXCallback = (data: Uint8Array) => {};
}
