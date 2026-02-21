export class Click {

  constructor(code, ipAddress) {
    const now = new Date();

    this.code = code;
    this.ipAddress = ipAddress;
    this.weekDay = now.toLocaleDateString("en-US", {
      weekday: "long",
    });
    this.time = now.toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).split(" ")[1];
  }
}
