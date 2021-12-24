// import { Injectable } from "@angular/core";

// @Injectable({providedIn: 'root'})

export class LoggingService {
  lastlog: string | undefined;

  printLog(message: string) {
    console.log('This message is: ', message);
    console.log('Previous message is: ', this.lastlog);
    this.lastlog = message;
  }
}
