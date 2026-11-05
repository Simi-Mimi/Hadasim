export class Player {
  constructor(name) {
    this.name = name;
    this.times = [];
  }
  recordTime(start, end) {
    const duration=end-start;
    this.times.push(duration);
  }
  showStats() {
    const total = this.times.reduce((sum, time) => sum + time, 0);
    let avg=total/this.times.length;
    console.log("Great job, ",this.name,"!");
    console.log("Total time:", (total / 1000).toFixed(2), "seconds");
    console.log("Average time:", (avg / 1000).toFixed(2), "seconds");
  }
}
