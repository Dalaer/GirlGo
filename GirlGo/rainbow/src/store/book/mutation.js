import state from './state'
export default{
    addBklist(state , parms){
        state.bkList = parms;
    },
    addRacklist(state , parms){
        if( state.rackList.length <= 0 ){
            state.rackList.push(parms);
        }else{
            let index = state.rackList.findIndex(v=>v.title===parms.title);
            if(index<0){
                state.rackList.push(parms);
            }
        }  
    }
}