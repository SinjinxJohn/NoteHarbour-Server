const bucketSize = 10;
const leakyRate = 1;
bucket = {};


const leakyBucket = (req,res,next)=>{
    const clientId = req.ip ;
    if(!bucket[clientId]){
        bucket[clientId] = {currentSize:0,lastProcessedTime:Date.now()};
    }


    const buckets = bucket[clientId];
    const now = Date.now();

    const timeSinceLastProcessed = (now - buckets.lastProcessedTime )/ 1000;
    const leakedRequests = timeSinceLastProcessed * leakyRate;


    buckets.currentSize = Math.max(buckets.currentSize - leakedRequests,0);
    buckets.lastProcessedTime = now;


    if(buckets.currentSize<bucketSize){
        buckets.currentSize +=1;
        next();

    }else{
        res.status(429).send("Too Many Requests. Please try after some time");
    }

}

module.exports = {leakyBucket};