// Accurate timeer constuctor function

function Timer(callback, timeInterval, options){
    this.timeInterval = timeInterval;

    // Add method to start timer
    this.start = ()=>{
        // Set the expected time. The moment in time we 
        // start the timeer plust whatever the time interval is
        this.expected = Date.now() + this.timeInterval;
        // Start the timeout anda save the id in a propert
        //so we can cancel it later
        this.theTimeout = null;
        if(options.immediate) callback();
        this.timeout = setTimeout(this.round, this.timeInterval);
    }

    // Add method to stop the timer
    this.stop = ()=>{
        clearTimeout(this.timeout);
    }

    this.round = ()=>{
        // The drift will be the current moment in time for this round minus the expected time
        let drift = Date.now() - this.expected;
        if(drift > this.timeInterval){
            if(options.errorCallback){
                options.errorCallback();
            }
        }
        callback();
        // Increment the time by time interval for every round after running the callback function
        this.expected += this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}