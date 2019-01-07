function getMyName(...args){
    var str = args.join();    
return str;
}
getMyName("X"); //result is Hi X
getMyName("Hi ", "X"); //result is Hi X
getMyName("Hi ", "MR. ", "X"); //result is Hi MR. X
getMyName("Hi ", "MR. ", "X", "How are you"); //result is Hi MR. X How are you

