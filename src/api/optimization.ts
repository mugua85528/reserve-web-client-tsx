class Optimization {
  // 節流
  throttle(fn: () => void, delay: number = 300) {
    let canRun: boolean = true;

    return () => {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
        fn();
        canRun = true;
      }, delay);
    };
  }
}

export default new Optimization();
